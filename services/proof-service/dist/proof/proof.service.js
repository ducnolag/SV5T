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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shared_database_1 = require("shared-database");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const axios_1 = __importDefault(require("axios"));
let ProofService = class ProofService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadProof(userId, tieuChiId, file, hoSoId, ocrValid) {
        const uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, file.buffer);
        let trangThai = 'DANG_XL';
        let aiScore = null;
        let resolvedTieuChiId = tieuChiId;
        try {
            const apiMd = fs.readFileSync('d:/hackathon/api.md', 'utf8');
            const tokenIdMatch = apiMd.match(/Token ID: (.+)/);
            const tokenKeyMatch = apiMd.match(/Token Key: (.+)/);
            const accessTokenMatch = apiMd.match(/Access Token: (Bearer .+)/);
            const tokenId = tokenIdMatch ? tokenIdMatch[1].trim() : '';
            const tokenKey = tokenKeyMatch ? tokenKeyMatch[1].trim() : '';
            const authen = accessTokenMatch ? accessTokenMatch[1].trim() : '';
            const baseUrl = 'https://api.idg.vnpt.vn';
            const FormData = require('form-data');
            const form = new FormData();
            form.append('file', file.buffer, { filename: file.originalname, contentType: file.mimetype });
            form.append('title', 'minh-chung');
            form.append('description', 'minh-chung-sv5t');
            const uploadRes = await axios_1.default.post(`${baseUrl}/file-service/v1/addFile`, form, {
                headers: {
                    ...form.getHeaders(),
                    'Token-id': tokenId,
                    'Token-key': tokenKey,
                    'mac-address': 'WEB-001',
                    'Authorization': authen
                },
            });
            const fileHash = uploadRes.data.object.hash;
            const urlRes = await axios_1.default.get(`${baseUrl}/proxy-service/url-file?hash=${encodeURIComponent(fileHash)}`, {
                headers: {
                    'Token-id': tokenId,
                    'Token-key': tokenKey,
                    'Authorization': authen
                }
            });
            const publicUrl = urlRes.data.object;
            const detectRes = await axios_1.default.post(`${baseUrl}/data-service/v1/smartvision/detect-people`, {
                data: publicUrl
            }, {
                headers: {
                    'Token-id': tokenId,
                    'Token-key': tokenKey,
                    'Authorization': authen,
                    'Content-Type': 'application/json'
                }
            });
            const dummyFaceHash = "idg20260702-559c6976-95b5-4479-e063-63199f0a9a27/IDG01_aaae9124-75ea-11f1-bce8-415d381e887c";
            let isFaceMatched = false;
            try {
                const compareRes = await axios_1.default.post(`${baseUrl}/ai/v1/web/face/compare`, {
                    img_front: dummyFaceHash,
                    img_face: fileHash,
                    client_session: "WEB-SDK_Chrome",
                    token: "test"
                }, {
                    headers: {
                        'Token-id': tokenId,
                        'Token-key': tokenKey,
                        'Authorization': authen,
                        'mac-address': 'WEB-001',
                    }
                });
                if (compareRes.data?.object?.msg === 'MATCH') {
                    isFaceMatched = true;
                }
            }
            catch (e) {
            }
            if (ocrValid === 'true') {
                aiScore = 85;
                trangThai = 'DA_XAC_THUC';
            }
            else {
                const peopleCount = detectRes.data?.object?.length || 0;
                if (isFaceMatched) {
                    aiScore = 95;
                    trangThai = 'DA_XAC_THUC';
                }
                else if (peopleCount > 0) {
                    aiScore = 65;
                    trangThai = 'CAN_KIEM_TRA';
                }
                else {
                    aiScore = 20;
                    trangThai = 'CAN_KIEM_TRA';
                }
            }
        }
        catch (e) {
            console.error('[AI VNPT] Lỗi tích hợp:', e.response?.data || e.message);
            trangThai = ocrValid === 'true' ? 'DA_XAC_THUC' : 'DANG_XL';
            aiScore = ocrValid === 'true' ? 85 : null;
        }
        const data = {
            nguoi_dung_id: userId,
            tieu_chi_id: resolvedTieuChiId || null,
            loai: 'BEN_NGOAI',
            file_url: `/uploads/${fileName}`,
            trang_thai: trangThai,
            ai_xac_thuc_muc_do: aiScore,
        };
        const newProof = await this.prisma.minhChung.create({
            data,
            include: { tieu_chi: true },
        });
        if (hoSoId) {
            await this.prisma.hoSo.update({
                where: { id: hoSoId },
                data: { minh_chungs: { connect: { id: newProof.id } } }
            });
        }
        return newProof;
    }
    async getMyProofs(userId) {
        return this.prisma.minhChung.findMany({
            where: { nguoi_dung_id: userId },
            include: { tieu_chi: true },
            orderBy: { created_at: 'desc' },
        });
    }
    async getAllPendingProofs() {
        return this.prisma.minhChung.findMany({
            where: { trang_thai: { in: ['CAN_KIEM_TRA', 'DANG_XL'] } },
            include: {
                tieu_chi: true,
                nguoi_dung: { select: { id: true, ho_ten: true, msv: true } },
            },
            orderBy: { created_at: 'asc' },
        });
    }
    async reviewProof(id, dto, user) {
        if (user.role === shared_database_1.VaiTro.SINH_VIEN || user.role === shared_database_1.VaiTro.LCH_CLB) {
            throw new common_1.ForbiddenException('Bạn không có quyền duyệt minh chứng');
        }
        const proof = await this.prisma.minhChung.findUnique({ where: { id } });
        if (!proof) {
            throw new common_1.NotFoundException('Không tìm thấy minh chứng');
        }
        return this.prisma.minhChung.update({
            where: { id },
            data: {
                trang_thai: dto.trang_thai,
                nguoi_duyet_id: user.id,
                ly_do_loai: dto.ly_do_loai,
            },
        });
    }
    async deleteProof(id, userId) {
        const proof = await this.prisma.minhChung.findUnique({ where: { id } });
        if (!proof)
            throw new common_1.NotFoundException('Không tìm thấy minh chứng');
        if (proof.nguoi_dung_id !== userId)
            throw new common_1.ForbiddenException('Không có quyền xóa');
        return this.prisma.minhChung.delete({ where: { id } });
    }
};
exports.ProofService = ProofService;
exports.ProofService = ProofService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProofService);
//# sourceMappingURL=proof.service.js.map