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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const xlsx = __importStar(require("xlsx"));
let AttendanceService = class AttendanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async processExcelUpload(activityId, fileBuffer) {
        const activity = await this.prisma.hoatDong.findUnique({
            where: { id: activityId },
        });
        if (!activity) {
            throw new common_1.NotFoundException('Không tìm thấy hoạt động');
        }
        try {
            const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet);
            if (data.length === 0) {
                throw new common_1.BadRequestException('File Excel trống');
            }
            let successCount = 0;
            let failedCount = 0;
            const failedMsvs = [];
            for (const row of data) {
                const msv = row['MSV'] || row['Mã SV'] || row['Mã Sinh Viên'] || row['msv'];
                if (!msv) {
                    failedCount++;
                    continue;
                }
                const user = await this.prisma.nguoiDung.findFirst({
                    where: { msv: String(msv) },
                });
                if (!user) {
                    failedCount++;
                    failedMsvs.push(msv);
                    continue;
                }
                try {
                    await this.prisma.diemDanh.create({
                        data: {
                            hoat_dong_id: activityId,
                            nguoi_dung_id: user.id,
                            phuong_thuc: 'UPLOAD_EXCEL',
                        },
                    });
                    successCount++;
                }
                catch {
                    failedCount++;
                }
            }
            return {
                message: 'Xử lý điểm danh hoàn tất',
                success_count: successCount,
                failed_count: failedCount,
                failed_msvs: failedMsvs,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException)
                throw error;
            throw new common_1.BadRequestException('Lỗi định dạng file Excel');
        }
    }
    async getAttendanceList(activityId) {
        return this.prisma.diemDanh.findMany({
            where: { hoat_dong_id: activityId },
            include: {
                nguoi_dung: {
                    select: { id: true, ho_ten: true, msv: true, email: true },
                },
            },
        });
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map