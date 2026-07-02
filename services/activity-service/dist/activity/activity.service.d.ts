import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto, ApproveActivityDto } from './dto';
export declare class ActivityService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllActivities(): Promise<({
        don_vi_tc: {
            trang_thai: boolean;
            id: string;
            created_at: Date;
            ten_don_vi: string;
            cap_do: import("shared-database").$Enums.CapDo;
            parent_id: string | null;
        };
        tieu_chis: {
            mo_ta: string | null;
            id: string;
            quy_che_id: string;
            ten_tieu_chi: string;
            thu_tu: number | null;
            so_luong_yeu_cau: number;
        }[];
    } & {
        don_vi_tc_id: string;
        ten_hoat_dong: string;
        thoi_gian_bat_dau: Date;
        thoi_gian_ket_thuc: Date;
        hinh_thuc_dd: string;
        trang_thai: string;
        id: string;
        dia_diem: string | null;
        nguoi_duyet_id: string | null;
        ly_do_tu_choi: string | null;
        created_at: Date;
    })[]>;
    createActivity(dto: CreateActivityDto, user: any): Promise<{
        don_vi_tc_id: string;
        ten_hoat_dong: string;
        thoi_gian_bat_dau: Date;
        thoi_gian_ket_thuc: Date;
        hinh_thuc_dd: string;
        trang_thai: string;
        id: string;
        dia_diem: string | null;
        nguoi_duyet_id: string | null;
        ly_do_tu_choi: string | null;
        created_at: Date;
    }>;
    approveActivity(id: string, dto: ApproveActivityDto, user: any): Promise<{
        don_vi_tc_id: string;
        ten_hoat_dong: string;
        thoi_gian_bat_dau: Date;
        thoi_gian_ket_thuc: Date;
        hinh_thuc_dd: string;
        trang_thai: string;
        id: string;
        dia_diem: string | null;
        nguoi_duyet_id: string | null;
        ly_do_tu_choi: string | null;
        created_at: Date;
    }>;
}
