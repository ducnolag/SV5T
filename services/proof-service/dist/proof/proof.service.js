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
exports.ProofService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shared_database_1 = require("shared-database");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let ProofService = class ProofService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadProof(userId, tieuChiId, files, hoSoId, ocrValid, tenMinhChung, aiMismatch, aiSuggestion) {
        const uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const crypto = require('crypto');
        const fileUrls = [];
        for (const file of files) {
            const hash = crypto.createHash('md5').update(file.buffer).digest('hex');
            const existing = await this.prisma.minhChung.findFirst({
                where: {
                    nguoi_dung_id: userId,
                    file_url: { contains: `__${hash}__` }
                }
            });
            if (existing) {
                throw new common_1.BadRequestException(`Tệp "${file.originalname}" đã được tải lên trước đó. Vui lòng không nộp trùng lặp minh chứng!`);
            }
            const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
            const fileName = `${Date.now()}__${hash}__${safeName}`;
            const filePath = path.join(uploadDir, fileName);
            fs.writeFileSync(filePath, file.buffer);
            fileUrls.push(`/uploads/${fileName}`);
        }
        let trangThai = 'DANG_XL';
        let aiScore = null;
        let resolvedTieuChiId = tieuChiId;
        let finalTenMinhChung = tenMinhChung;
        if (aiMismatch === 'true') {
            trangThai = 'CAN_KIEM_TRA';
            aiScore = 30;
            finalTenMinhChung = `[⚠️ Cảnh báo AI: Chọn sai loại - Khuyến nghị: ${aiSuggestion || 'Khác'}] ${tenMinhChung || 'Không tên'}`;
        }
        else if (ocrValid === 'true') {
            trangThai = 'DA_XAC_THUC';
            aiScore = 95;
        }
        else {
            aiScore = 60;
            trangThai = 'CAN_KIEM_TRA';
        }
        const data = {
            nguoi_dung_id: userId,
            tieu_chi_id: resolvedTieuChiId || null,
            loai: 'BEN_NGOAI',
            ten_minh_chung: finalTenMinhChung,
            file_url: JSON.stringify(fileUrls),
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