"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shared_database_1 = require("shared-database");
const axios_1 = __importDefault(require("axios"));
let ApplicationService = class ApplicationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMyApplications(userId) {
        return this.prisma.hoSo.findMany({
            where: { nguoi_dung_id: userId },
            include: {
                quy_che: { include: { tieu_chis: true } },
                minh_chungs: true,
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async getPendingApplications(user) {
        const pendingStateMap = {
            [shared_database_1.VaiTro.CB_TRUONG]: [shared_database_1.TrangThaiHoSo.CHO_DUYET_TRUONG],
            [shared_database_1.VaiTro.CB_TINH]: [shared_database_1.TrangThaiHoSo.CHO_DUYET_TINH],
            [shared_database_1.VaiTro.CB_TW]: [shared_database_1.TrangThaiHoSo.CHO_DUYET_TW],
            [shared_database_1.VaiTro.ADMIN]: [shared_database_1.TrangThaiHoSo.CHO_DUYET_TRUONG, shared_database_1.TrangThaiHoSo.CHO_DUYET_TINH, shared_database_1.TrangThaiHoSo.CHO_DUYET_TW],
        };
        const states = pendingStateMap[user.role] || [];
        return this.prisma.hoSo.findMany({
            where: { trang_thai: { in: states } },
            include: {
                nguoi_dung: { select: { id: true, ho_ten: true, msv: true, email: true } },
                quy_che: { include: { tieu_chis: true } },
                minh_chungs: true,
            },
            orderBy: { ngay_nop: 'asc' },
        });
    }
    async getQuyChes() {
        return this.prisma.quyChe.findMany({
            include: { tieu_chis: true, don_vi: true },
            orderBy: { created_at: 'desc' },
        });
    }
    async createDraft(userId, dto) {
        const existing = await this.prisma.hoSo.findUnique({
            where: {
                nguoi_dung_id_quy_che_id: {
                    nguoi_dung_id: userId,
                    quy_che_id: dto.quy_che_id,
                }
            }
        });
        if (existing) {
            throw new common_1.BadRequestException('Hồ sơ cho quy chế này đã tồn tại');
        }
        return this.prisma.hoSo.create({
            data: {
                nguoi_dung_id: userId,
                quy_che_id: dto.quy_che_id,
                trang_thai: shared_database_1.TrangThaiHoSo.DANG_TAO,
                cap_hien_tai: 'TRUONG',
                minh_chungs: dto.minh_chung_ids?.length
                    ? { connect: dto.minh_chung_ids.map(id => ({ id })) }
                    : undefined,
            },
            include: {
                minh_chungs: true,
                quy_che: { include: { tieu_chis: true } },
            }
        });
    }
    async submitApplication(id, userId) {
        const app = await this.prisma.hoSo.findUnique({
            where: { id },
            include: { minh_chungs: true }
        });
        if (!app || app.nguoi_dung_id !== userId) {
            throw new common_1.NotFoundException('Không tìm thấy hồ sơ');
        }
        if (app.trang_thai !== shared_database_1.TrangThaiHoSo.DANG_TAO) {
            throw new common_1.BadRequestException('Chỉ có thể nộp hồ sơ ở trạng thái nháp');
        }
        const aiFlag = app.minh_chungs.length >= 5 ? 'XANH' : app.minh_chungs.length >= 3 ? 'VANG' : 'DO';
        const ghiChuAi = `AI sơ duyệt: ${app.minh_chungs.length} minh chứng. Phân loại ${aiFlag}.`;
        return this.prisma.hoSo.update({
            where: { id },
            data: {
                trang_thai: shared_database_1.TrangThaiHoSo.CHO_DUYET_TRUONG,
                khoa: true,
                ngay_nop: new Date(),
                ai_flag: aiFlag,
                ghi_chu_ai: ghiChuAi,
            }
        });
    }
    async reviewApplication(id, dto, user) {
        if (user.role === shared_database_1.VaiTro.SINH_VIEN) {
            throw new common_1.ForbiddenException('Sinh viên không được duyệt hồ sơ');
        }
        const app = await this.prisma.hoSo.findUnique({ where: { id } });
        if (!app) {
            throw new common_1.NotFoundException('Không tìm thấy hồ sơ');
        }
        if (app.trang_thai === shared_database_1.TrangThaiHoSo.CHO_DUYET_TRUONG && user.role !== shared_database_1.VaiTro.CB_TRUONG && user.role !== shared_database_1.VaiTro.ADMIN) {
            throw new common_1.ForbiddenException('Chỉ Cán bộ Trường mới có quyền duyệt hồ sơ cấp Trường');
        }
        if (app.trang_thai === shared_database_1.TrangThaiHoSo.CHO_DUYET_TINH && user.role !== shared_database_1.VaiTro.CB_TINH && user.role !== shared_database_1.VaiTro.ADMIN) {
            throw new common_1.ForbiddenException('Chỉ Cán bộ Tỉnh mới có quyền duyệt hồ sơ cấp Tỉnh');
        }
        if (app.trang_thai === shared_database_1.TrangThaiHoSo.CHO_DUYET_TW && user.role !== shared_database_1.VaiTro.CB_TW && user.role !== shared_database_1.VaiTro.ADMIN) {
            throw new common_1.ForbiddenException('Chỉ Cán bộ TW mới có quyền duyệt hồ sơ cấp TW');
        }
        const updatedApp = await this.prisma.hoSo.update({
            where: { id },
            data: {
                trang_thai: dto.trang_thai,
            }
        });
        try {
            const notifyUrl = process.env.NOTIFICATION_URL || 'http://localhost:3007';
            const stateLabel = {
                DAT_TRUONG: '✅ Đạt cấp Trường',
                DAT_TINH: '✅ Đạt cấp Tỉnh/TP',
                DAT_SV5T: '🏆 Đạt danh hiệu SV5T!',
                BI_TU_CHOI: '❌ Bị từ chối',
            };
            await axios_1.default.post(`${notifyUrl}/internal/notify`, {
                userId: updatedApp.nguoi_dung_id,
                message: `Hồ sơ SV5T của bạn: ${stateLabel[dto.trang_thai] || dto.trang_thai}`,
            });
        }
        catch (e) {
            console.error('Lỗi khi gửi thông báo:', e.message);
        }
        return updatedApp;
    }
    async escalateBatch(appIds, user) {
        if (user.role !== shared_database_1.VaiTro.CB_TRUONG && user.role !== shared_database_1.VaiTro.CB_TINH && user.role !== shared_database_1.VaiTro.ADMIN) {
            throw new common_1.ForbiddenException('Bạn không có quyền trình tuyến trên');
        }
        const apps = await this.prisma.hoSo.findMany({
            where: { id: { in: appIds } }
        });
        for (const app of apps) {
            let nextState = app.trang_thai;
            let nextCap = app.cap_hien_tai;
            if (app.trang_thai === shared_database_1.TrangThaiHoSo.DAT_TRUONG) {
                nextState = shared_database_1.TrangThaiHoSo.CHO_DUYET_TINH;
                nextCap = 'TINH';
            }
            else if (app.trang_thai === shared_database_1.TrangThaiHoSo.DAT_TINH) {
                nextState = shared_database_1.TrangThaiHoSo.CHO_DUYET_TW;
                nextCap = 'TW';
            }
            else {
                throw new common_1.BadRequestException(`Hồ sơ ${app.id} không ở trạng thái hợp lệ để trình tuyến trên`);
            }
            await this.prisma.hoSo.update({
                where: { id: app.id },
                data: { trang_thai: nextState, cap_hien_tai: nextCap }
            });
        }
        return { message: `Đã trình tuyến trên thành công ${apps.length} hồ sơ` };
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationService);
//# sourceMappingURL=application.service.js.map