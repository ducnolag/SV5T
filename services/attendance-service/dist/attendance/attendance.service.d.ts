import { PrismaService } from '../prisma/prisma.service';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    processExcelUpload(activityId: string, fileBuffer: Buffer): Promise<{
        message: string;
        success_count: number;
        failed_count: number;
        failed_msvs: string[];
    }>;
    getAttendanceList(activityId: string): Promise<({
        nguoi_dung: {
            id: string;
            msv: string | null;
            email: string;
            ho_ten: string;
        };
    } & {
        id: string;
        phuong_thuc: string;
        thoi_gian: Date;
        da_chot: boolean;
        hoat_dong_id: string;
        nguoi_dung_id: string;
    })[]>;
}
