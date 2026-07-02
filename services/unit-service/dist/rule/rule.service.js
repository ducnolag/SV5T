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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shared_database_1 = require("shared-database");
let RuleService = class RuleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllRules() {
        return this.prisma.quyChe.findMany({
            include: { don_vi: true, tieu_chis: true },
        });
    }
    async createRule(dto, user) {
        if (user.role === shared_database_1.VaiTro.SINH_VIEN) {
            throw new common_1.ForbiddenException('Sinh viên không có quyền tạo quy chế');
        }
        const checkExist = await this.prisma.quyChe.findFirst({
            where: { don_vi_id: dto.don_vi_id, nam_hoc: dto.nam_hoc },
        });
        if (checkExist) {
            throw new common_1.BadRequestException('Quy chế cho năm học này đã tồn tại ở đơn vị này');
        }
        const rule = await this.prisma.quyChe.create({
            data: {
                don_vi_id: dto.don_vi_id,
                nam_hoc: dto.nam_hoc,
                ngay_mo_cong: new Date(dto.ngay_mo_cong),
                ngay_dong_cong: new Date(dto.ngay_dong_cong),
                so_tieu_chi_dat: dto.so_tieu_chi_dat || 5,
            },
        });
        const defaultTieuChis = ['Đạo đức tốt', 'Học tập tốt', 'Thể lực tốt', 'Tình nguyện tốt', 'Hội nhập tốt'];
        await this.prisma.tieuChi.createMany({
            data: defaultTieuChis.map((tc, i) => ({
                quy_che_id: rule.id,
                ten_tieu_chi: tc,
                thu_tu: i + 1,
            })),
        });
        console.log(`[Scheduler Mock] Đã lập lịch thông báo cho Quy chế ${rule.id}`);
        return this.prisma.quyChe.findUnique({
            where: { id: rule.id },
            include: { tieu_chis: true },
        });
    }
    async updateTimeWindow(id, dto, user) {
        if (user.role === shared_database_1.VaiTro.SINH_VIEN) {
            throw new common_1.ForbiddenException('Không có quyền');
        }
        const rule = await this.prisma.quyChe.update({
            where: { id },
            data: {
                ngay_mo_cong: new Date(dto.ngay_mo_cong),
                ngay_dong_cong: new Date(dto.ngay_dong_cong),
            },
        });
        console.log(`[Scheduler Mock] Cập nhật lịch thông báo cho Quy chế ${rule.id}`);
        return rule;
    }
};
exports.RuleService = RuleService;
exports.RuleService = RuleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RuleService);
//# sourceMappingURL=rule.service.js.map