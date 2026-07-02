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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shared_database_1 = require("shared-database");
let ActivityService = class ActivityService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllActivities() {
        return this.prisma.hoatDong.findMany({
            include: {
                tieu_chis: true,
                don_vi_tc: true,
            },
        });
    }
    async createActivity(dto, user) {
        if (user.role === shared_database_1.VaiTro.SINH_VIEN) {
            throw new common_1.ForbiddenException('Sinh viên không được tạo hoạt động');
        }
        return this.prisma.hoatDong.create({
            data: {
                don_vi_tc_id: dto.don_vi_tc_id,
                ten_hoat_dong: dto.ten_hoat_dong,
                hinh_thuc_dd: dto.hinh_thuc_dd,
                thoi_gian_bat_dau: new Date(dto.thoi_gian_bat_dau),
                thoi_gian_ket_thuc: new Date(dto.thoi_gian_ket_thuc),
                trang_thai: 'CHO_DUYET',
                tieu_chis: {
                    connect: {
                        id: dto.tieu_chi_id,
                    }
                }
            }
        });
    }
    async approveActivity(id, dto, user) {
        if (user.role === shared_database_1.VaiTro.SINH_VIEN) {
            throw new common_1.ForbiddenException('Không có quyền duyệt');
        }
        const activity = await this.prisma.hoatDong.findUnique({
            where: { id },
            include: { don_vi_tc: true },
        });
        if (!activity) {
            throw new common_1.NotFoundException('Không tìm thấy hoạt động');
        }
        return this.prisma.hoatDong.update({
            where: { id },
            data: {
                trang_thai: dto.trang_thai,
            },
        });
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActivityService);
//# sourceMappingURL=activity.service.js.map