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
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shared_database_1 = require("shared-database");
let UnitService = class UnitService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUnits() {
        return this.prisma.donVi.findMany({
            where: { trang_thai: true },
            orderBy: { ten_don_vi: 'asc' },
        });
    }
    async getTree() {
        const all = await this.prisma.donVi.findMany({
            where: { trang_thai: true },
            orderBy: [{ cap_do: 'asc' }, { ten_don_vi: 'asc' }],
        });
        const buildTree = (items, parentId) => {
            return items
                .filter(item => item.parent_id === parentId)
                .map(item => ({
                ...item,
                children: buildTree(items, item.id),
            }));
        };
        return buildTree(all, null);
    }
    async createUnit(dto, user) {
        if (user.role === shared_database_1.VaiTro.SINH_VIEN || user.role === shared_database_1.VaiTro.LCH_CLB) {
            throw new common_1.ForbiddenException('Không có quyền tạo đơn vị');
        }
        return this.prisma.donVi.create({
            data: {
                ten_don_vi: dto.ten_don_vi,
                cap_do: dto.cap_do,
                parent_id: dto.parent_id,
            },
        });
    }
};
exports.UnitService = UnitService;
exports.UnitService = UnitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnitService);
//# sourceMappingURL=unit.service.js.map