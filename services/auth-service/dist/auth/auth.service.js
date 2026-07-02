"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const audit_service_1 = require("../audit/audit.service");
const shared_database_1 = require("shared-database");
let AuthService = class AuthService {
    prisma;
    jwtService;
    auditService;
    constructor(prisma, jwtService, auditService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.auditService = auditService;
    }
    async login(dto) {
        const user = await this.prisma.nguoiDung.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Email hoặc mật khẩu không đúng');
        }
        const isMatch = await bcrypt.compare(dto.mat_khau, user.mat_khau);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Email hoặc mật khẩu không đúng');
        }
        if (user.trang_thai === 'LOCKED') {
            throw new common_1.UnauthorizedException('Tài khoản đã bị khóa');
        }
        const payload = { sub: user.id, email: user.email, role: user.vai_tro, don_vi_id: user.don_vi_id };
        const access_token = this.jwtService.sign(payload);
        await this.auditService.logAction(user.id, 'LOGIN', 'USER', user.id);
        return {
            access_token,
            user: {
                id: user.id,
                email: user.email,
                ho_ten: user.ho_ten,
                vai_tro: user.vai_tro,
                don_vi_id: user.don_vi_id,
            },
        };
    }
    async register(dto) {
        const existingUser = await this.prisma.nguoiDung.findFirst({
            where: {
                OR: [{ email: dto.email }, { msv: dto.msv }, { cccd: dto.cccd }],
            },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email, MSV hoặc CCCD đã tồn tại');
        }
        const ekycValid = await this.mockVnptEkyc(dto.cccd);
        if (!ekycValid) {
            throw new common_1.BadRequestException('Xác thực eKYC thất bại');
        }
        const hashedPassword = await bcrypt.hash(dto.mat_khau, 10);
        const encryptedCccd = `ENCRYPTED_${dto.cccd}`;
        const newUser = await this.prisma.nguoiDung.create({
            data: {
                email: dto.email,
                mat_khau: hashedPassword,
                ho_ten: dto.ho_ten,
                msv: dto.msv,
                cccd: encryptedCccd,
                vai_tro: dto.vai_tro || shared_database_1.VaiTro.SINH_VIEN,
            },
        });
        await this.auditService.logAction(newUser.id, 'REGISTER', 'USER', newUser.id, null, { email: dto.email });
        return { message: 'Đăng ký thành công', userId: newUser.id };
    }
    async verifyEkycReal(files) {
        if (!files || files.length < 3) {
            throw new common_1.BadRequestException('Vui lòng upload đủ 3 ảnh (mặt trước, mặt sau, khuôn mặt)');
        }
        const imgFront = files.find(f => f.fieldname === 'img_front');
        const imgBack = files.find(f => f.fieldname === 'img_back');
        const imgFace = files.find(f => f.fieldname === 'img_face');
        if (!imgFront || !imgBack || !imgFace) {
            throw new common_1.BadRequestException('Thiếu file ảnh hợp lệ');
        }
        const baseUrl = process.env.VNPT_BASE_URL || 'https://api.idg.vnpt.vn';
        const fs = require('fs');
        const apiMd = fs.readFileSync('d:/hackathon/api.md', 'utf8');
        const tokenIdMatch = apiMd.match(/Token ID: (.+)/);
        const tokenKeyMatch = apiMd.match(/Token Key: (.+)/);
        const accessTokenMatch = apiMd.match(/Access Token: (Bearer .+)/);
        const tokenId = tokenIdMatch ? tokenIdMatch[1].trim() : '';
        const tokenKey = tokenKeyMatch ? tokenKeyMatch[1].trim() : '';
        const authen = accessTokenMatch ? accessTokenMatch[1].trim() : '';
        const axios = require('axios');
        const FormData = require('form-data');
        const uploadFile = async (file, title) => {
            const form = new FormData();
            form.append('file', file.buffer, { filename: file.originalname, contentType: file.mimetype });
            form.append('title', title);
            form.append('description', title);
            const res = await axios.post(`${baseUrl}/file-service/v1/addFile`, form, {
                headers: {
                    ...form.getHeaders(),
                    'Token-id': tokenId,
                    'Token-key': tokenKey,
                    'mac-address': 'WEB-001',
                    'Authorization': authen
                },
            });
            return res.data.object.hash;
        };
        try {
            console.log('Uploading images to VNPT eKYC...');
            const hashFront = await uploadFile(imgFront, 'ocr front');
            const hashBack = await uploadFile(imgBack, 'ocr back');
            const hashFace = await uploadFile(imgFace, 'face');
            console.log('Upload success. Hashes:', { hashFront, hashBack, hashFace });
            console.log('Calling VNPT OCR API...');
            const ocrRes = await axios.post(`${baseUrl}/ai/v1/web/ocr/id`, {
                img_front: hashFront,
                step_id: 0,
                validate_postcode: false,
                crop_param: "0,0",
                img_back: hashBack,
                client_session: "WEB-SDK_Chrome-134_3.1.0.0_8b50cd5e-0ef5-4839-8cd3-24168002f65b_1744097409162",
                token: "test",
                type: -1
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Token-id': tokenId,
                    'Token-key': tokenKey,
                    'mac-address': 'WEB-001',
                    'Authorization': authen
                }
            });
            console.log('OCR Response:', JSON.stringify(ocrRes.data, null, 2));
            if (ocrRes.data?.statusCode !== 200 && ocrRes.data?.message !== 'Success') {
                if (ocrRes.data?.statusCode || ocrRes.data?.message) {
                    console.error('OCR Business Error:', ocrRes.data);
                }
            }
            const ocrData = ocrRes.data?.object || {};
            console.log('Calling VNPT Face Compare API...');
            let compareMatch = true;
            try {
                const compareRes = await axios.post(`${baseUrl}/ai/v1/web/face/compare`, {
                    img_front: hashFront,
                    img_face: hashFace,
                    client_session: "WEB-SDK_Netscape-5.0 (iPhone; CPU iPhone OS 16_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148--?_2.1.4.7_820fa1ae-33af-4d39-9995-7f99c36ff83c_1741713120303",
                    token: "test"
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Token-id': tokenId,
                        'Token-key': tokenKey,
                        'mac-address': 'WEB-001',
                        'Authorization': authen
                    }
                });
                console.log('Face Compare Response:', JSON.stringify(compareRes.data, null, 2));
                if (compareRes.data?.object?.msg !== 'MATCH') {
                    compareMatch = false;
                }
            }
            catch (err) {
                console.error('Face Compare API failed:', err.response?.data || err.message);
                throw new common_1.BadRequestException(err.response?.data?.message || 'Lỗi so khớp khuôn mặt từ VNPT');
            }
            if (!compareMatch) {
                throw new common_1.BadRequestException('Khuôn mặt không khớp với thẻ CCCD');
            }
            return {
                success: true,
                data: {
                    ho_ten: ocrData.name || ocrData.ho_ten || ocrData.hoTen || ocrData.fullName,
                    cccd: ocrData.id || ocrData.so_cccd || ocrData.idNumber || ocrData.id_number,
                    ngay_sinh: ocrData.birthday || ocrData.ngay_sinh || ocrData.dob,
                }
            };
        }
        catch (e) {
            console.error('eKYC API Error Catch Block:', e.response?.data || e.message);
            throw new common_1.BadRequestException(e.response?.data?.message || e.message || 'Lỗi xác thực VNPT eKYC');
        }
    }
    async mockVnptEkyc(cccd) {
        console.log(`Mocking eKYC call for CCCD: ${cccd}...`);
        const tokenStr = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...";
        console.log(`Using VNPT eKYC Token: ${tokenStr.substring(0, 20)}...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        audit_service_1.AuditService])
], AuthService);
//# sourceMappingURL=auth.service.js.map