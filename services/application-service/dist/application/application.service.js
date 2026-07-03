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
                quy_che: { include: { tieu_chis: { orderBy: { thu_tu: 'asc' } } } },
                minh_chungs: true,
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async getApplicationById(id, user) {
        const app = await this.prisma.hoSo.findUnique({
            where: { id },
            include: {
                quy_che: { include: { tieu_chis: { orderBy: { thu_tu: 'asc' } } } },
                minh_chungs: { include: { tieu_chi: true } },
            }
        });
        if (!app)
            throw new common_1.NotFoundException('Không tìm thấy hồ sơ');
        if (user.role === shared_database_1.VaiTro.SINH_VIEN && app.nguoi_dung_id !== user.id) {
            throw new common_1.ForbiddenException('Bạn không có quyền xem hồ sơ này');
        }
        return app;
    }
    async getPendingApplications(user) {
        const pendingStateMap = {
            [shared_database_1.VaiTro.CB_TRUONG]: [shared_database_1.TrangThaiHoSo.CHO_DUYET_TRUONG, shared_database_1.TrangThaiHoSo.DAT_TRUONG],
            [shared_database_1.VaiTro.CB_TINH]: [shared_database_1.TrangThaiHoSo.CHO_DUYET_TINH, shared_database_1.TrangThaiHoSo.DAT_TINH],
            [shared_database_1.VaiTro.CB_TW]: [shared_database_1.TrangThaiHoSo.CHO_DUYET_TW, shared_database_1.TrangThaiHoSo.DAT_SV5T],
            [shared_database_1.VaiTro.ADMIN]: [shared_database_1.TrangThaiHoSo.CHO_DUYET_TRUONG, shared_database_1.TrangThaiHoSo.DAT_TRUONG, shared_database_1.TrangThaiHoSo.CHO_DUYET_TINH, shared_database_1.TrangThaiHoSo.DAT_TINH, shared_database_1.TrangThaiHoSo.CHO_DUYET_TW, shared_database_1.TrangThaiHoSo.DAT_SV5T],
        };
        const states = pendingStateMap[user.role] || [];
        let userFilter = {};
        if (user.role === shared_database_1.VaiTro.CB_TRUONG) {
            userFilter = { nguoi_dung: { don_vi_id: user.don_vi_id } };
        }
        else if (user.role === shared_database_1.VaiTro.CB_TINH) {
            userFilter = { nguoi_dung: { don_vi: { parent_id: user.don_vi_id } } };
        }
        else if (user.role === shared_database_1.VaiTro.CB_TW) {
        }
        return this.prisma.hoSo.findMany({
            where: {
                trang_thai: { in: states },
                ...userFilter
            },
            include: {
                nguoi_dung: { select: { id: true, ho_ten: true, msv: true, email: true } },
                quy_che: { include: { tieu_chis: true } },
                minh_chungs: true,
            },
            orderBy: { ngay_nop: 'asc' },
        });
    }
    async getQuyChes(userPayload) {
        const dbUser = await this.prisma.nguoiDung.findUnique({ where: { id: userPayload.id } });
        if (!dbUser)
            return [];
        if (dbUser.vai_tro === shared_database_1.VaiTro.ADMIN && !dbUser.don_vi_id) {
            return this.prisma.quyChe.findMany({
                include: { tieu_chis: true, don_vi: true },
                orderBy: { created_at: 'desc' },
            });
        }
        const donViIds = [];
        if (dbUser.don_vi_id) {
            let currentDonVi = await this.prisma.donVi.findUnique({ where: { id: dbUser.don_vi_id } });
            while (currentDonVi) {
                donViIds.push(currentDonVi.id);
                if (currentDonVi.parent_id) {
                    currentDonVi = await this.prisma.donVi.findUnique({ where: { id: currentDonVi.parent_id } });
                }
                else {
                    break;
                }
            }
        }
        return this.prisma.quyChe.findMany({
            where: { don_vi_id: { in: donViIds } },
            include: { tieu_chis: true, don_vi: true },
            orderBy: { created_at: 'desc' },
        });
    }
    async saveQuyChe(dto, userPayload) {
        const dbUser = await this.prisma.nguoiDung.findUnique({ where: { id: userPayload.id } });
        if (!dbUser)
            throw new Error("Không tìm thấy người dùng");
        let donViId = dbUser.don_vi_id;
        if (!donViId && dbUser.vai_tro === shared_database_1.VaiTro.ADMIN) {
            const truong = await this.prisma.donVi.findFirst({ where: { cap_do: 'TRUONG' } });
            if (truong)
                donViId = truong.id;
        }
        if (!donViId)
            throw new Error("Cán bộ không có đơn vị trực thuộc");
        const quyChe = await this.prisma.quyChe.upsert({
            where: {
                don_vi_id_nam_hoc: { don_vi_id: donViId, nam_hoc: dto.nam_hoc }
            },
            update: {
                ngay_mo_cong: new Date(dto.ngay_mo_cong),
                ngay_dong_cong: new Date(dto.ngay_dong_cong),
            },
            create: {
                don_vi_id: donViId,
                nam_hoc: dto.nam_hoc,
                ngay_mo_cong: new Date(dto.ngay_mo_cong),
                ngay_dong_cong: new Date(dto.ngay_dong_cong),
            }
        });
        for (const tc of dto.tieu_chis) {
            const existingTc = await this.prisma.tieuChi.findFirst({
                where: { quy_che_id: quyChe.id, ten_tieu_chi: tc.ten_tieu_chi }
            });
            if (existingTc) {
                await this.prisma.tieuChi.update({
                    where: { id: existingTc.id },
                    data: { mo_ta: tc.mo_ta, thu_tu: tc.thu_tu, so_luong_yeu_cau: tc.so_luong_yeu_cau }
                });
            }
            else {
                await this.prisma.tieuChi.create({
                    data: {
                        quy_che_id: quyChe.id,
                        ten_tieu_chi: tc.ten_tieu_chi,
                        mo_ta: tc.mo_ta,
                        thu_tu: tc.thu_tu,
                        so_luong_yeu_cau: tc.so_luong_yeu_cau
                    }
                });
            }
        }
        return quyChe;
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
    async submitApplication(id, userId, minhChungIds) {
        let app = await this.prisma.hoSo.findUnique({
            where: { id },
            include: { minh_chungs: true, quy_che: { include: { tieu_chis: true } } }
        });
        if (!app || app.nguoi_dung_id !== userId) {
            throw new common_1.NotFoundException('Không tìm thấy hồ sơ');
        }
        if (app.trang_thai !== shared_database_1.TrangThaiHoSo.DANG_TAO) {
            throw new common_1.BadRequestException('Chỉ có thể nộp hồ sơ ở trạng thái nháp');
        }
        if (minhChungIds && minhChungIds.length > 0) {
            await this.prisma.hoSo.update({
                where: { id },
                data: {
                    minh_chungs: {
                        set: [],
                        connect: minhChungIds.map(mcId => ({ id: mcId }))
                    }
                }
            });
            app = await this.prisma.hoSo.findUnique({
                where: { id },
                include: { minh_chungs: true, quy_che: { include: { tieu_chis: true } } }
            });
            if (!app) {
                throw new common_1.NotFoundException('Không tìm thấy hồ sơ');
            }
        }
        for (const tc of app.quy_che.tieu_chis) {
            const tcProofs = app.minh_chungs.filter(mc => mc.tieu_chi_id === tc.id);
            if (tcProofs.length < tc.so_luong_yeu_cau) {
                throw new common_1.BadRequestException(`Tiêu chí "${tc.ten_tieu_chi}" chưa đủ minh chứng. Yêu cầu: ${tc.so_luong_yeu_cau}, Đã có: ${tcProofs.length}`);
            }
        }
        const totalAiScore = app.minh_chungs.reduce((acc, mc) => acc + (mc.ai_xac_thuc_muc_do || 0), 0);
        const avgAiScore = totalAiScore / Math.max(app.minh_chungs.length, 1);
        let aiFlag = 'DO';
        if (avgAiScore > 85)
            aiFlag = 'XANH';
        else if (avgAiScore > 50)
            aiFlag = 'VANG';
        const ghiChuAi = `AI sơ duyệt: Điểm eKYC trung bình ${avgAiScore.toFixed(1)}%. Phân loại ${aiFlag}.`;
        const updated = await this.prisma.hoSo.update({
            where: { id },
            data: {
                trang_thai: shared_database_1.TrangThaiHoSo.CHO_DUYET_TRUONG,
                khoa: true,
                ngay_nop: new Date(),
                ai_flag: aiFlag,
                ghi_chu_ai: ghiChuAi,
            }
        });
        try {
            await axios_1.default.post('http://localhost:3007/internal/broadcast', { message: 'REFRESH_APPLICATIONS' });
        }
        catch (e) { }
        return updated;
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
            await axios_1.default.post(`${notifyUrl}/internal/broadcast`, { message: 'REFRESH_APPLICATIONS' });
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
        try {
            await axios_1.default.post('http://localhost:3007/internal/broadcast', { message: 'REFRESH_APPLICATIONS' });
        }
        catch (e) { }
        return { message: `Đã trình tuyến trên thành công ${apps.length} hồ sơ` };
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationService);
//# sourceMappingURL=application.service.js.map