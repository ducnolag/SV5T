import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    uploadExcel(activityId: string, file: Express.Multer.File): Promise<{
        message: string;
        success_count: number;
        failed_count: number;
        failed_msvs: string[];
    }>;
    getList(activityId: string): Promise<({
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
