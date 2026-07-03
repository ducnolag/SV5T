import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto, ReviewApplicationDto } from './dto';
export declare class ApplicationService {
    private prisma;
    constructor(prisma: PrismaService);
    getMyApplications(userId: string): Promise<({
        quy_che: {
            tieu_chis: {
                id: string;
                quy_che_id: string;
                thu_tu: number | null;
                ten_tieu_chi: string;
                mo_ta: string | null;
                so_luong_yeu_cau: number;
            }[];
        } & {
            id: string;
            created_at: Date;
            don_vi_id: string;
            nam_hoc: string;
            ngay_mo_cong: Date;
            ngay_dong_cong: Date;
            so_tieu_chi_dat: number;
        };
        minh_chungs: {
            id: string;
            nguoi_dung_id: string;
            trang_thai: string;
            created_at: Date;
            tieu_chi_id: string | null;
            loai: string;
            ten_minh_chung: string | null;
            file_url: string;
            ai_xac_thuc_muc_do: number | null;
            nguoi_duyet_id: string | null;
            ly_do_loai: string | null;
        }[];
    } & {
        id: string;
        nguoi_dung_id: string;
        quy_che_id: string;
        cap_hien_tai: string;
        trang_thai: import("shared-database").$Enums.TrangThaiHoSo;
        ai_flag: string | null;
        ghi_chu_ai: string | null;
        khoa: boolean;
        ngay_nop: Date | null;
        created_at: Date;
    })[]>;
    getApplicationById(id: string, user: any): Promise<{
        quy_che: {
            tieu_chis: {
                id: string;
                quy_che_id: string;
                thu_tu: number | null;
                ten_tieu_chi: string;
                mo_ta: string | null;
                so_luong_yeu_cau: number;
            }[];
        } & {
            id: string;
            created_at: Date;
            don_vi_id: string;
            nam_hoc: string;
            ngay_mo_cong: Date;
            ngay_dong_cong: Date;
            so_tieu_chi_dat: number;
        };
        minh_chungs: ({
            tieu_chi: {
                id: string;
                quy_che_id: string;
                thu_tu: number | null;
                ten_tieu_chi: string;
                mo_ta: string | null;
                so_luong_yeu_cau: number;
            } | null;
        } & {
            id: string;
            nguoi_dung_id: string;
            trang_thai: string;
            created_at: Date;
            tieu_chi_id: string | null;
            loai: string;
            ten_minh_chung: string | null;
            file_url: string;
            ai_xac_thuc_muc_do: number | null;
            nguoi_duyet_id: string | null;
            ly_do_loai: string | null;
        })[];
    } & {
        id: string;
        nguoi_dung_id: string;
        quy_che_id: string;
        cap_hien_tai: string;
        trang_thai: import("shared-database").$Enums.TrangThaiHoSo;
        ai_flag: string | null;
        ghi_chu_ai: string | null;
        khoa: boolean;
        ngay_nop: Date | null;
        created_at: Date;
    }>;
    getPendingApplications(user: any): Promise<({
        nguoi_dung: {
            id: string;
            email: string;
            msv: string | null;
            ho_ten: string;
        };
        quy_che: {
            tieu_chis: {
                id: string;
                quy_che_id: string;
                thu_tu: number | null;
                ten_tieu_chi: string;
                mo_ta: string | null;
                so_luong_yeu_cau: number;
            }[];
        } & {
            id: string;
            created_at: Date;
            don_vi_id: string;
            nam_hoc: string;
            ngay_mo_cong: Date;
            ngay_dong_cong: Date;
            so_tieu_chi_dat: number;
        };
        minh_chungs: {
            id: string;
            nguoi_dung_id: string;
            trang_thai: string;
            created_at: Date;
            tieu_chi_id: string | null;
            loai: string;
            ten_minh_chung: string | null;
            file_url: string;
            ai_xac_thuc_muc_do: number | null;
            nguoi_duyet_id: string | null;
            ly_do_loai: string | null;
        }[];
    } & {
        id: string;
        nguoi_dung_id: string;
        quy_che_id: string;
        cap_hien_tai: string;
        trang_thai: import("shared-database").$Enums.TrangThaiHoSo;
        ai_flag: string | null;
        ghi_chu_ai: string | null;
        khoa: boolean;
        ngay_nop: Date | null;
        created_at: Date;
    })[]>;
    getQuyChes(): Promise<({
        don_vi: {
            id: string;
            trang_thai: boolean;
            created_at: Date;
            ten_don_vi: string;
            cap_do: import("shared-database").$Enums.CapDo;
            parent_id: string | null;
        };
        tieu_chis: {
            id: string;
            quy_che_id: string;
            thu_tu: number | null;
            ten_tieu_chi: string;
            mo_ta: string | null;
            so_luong_yeu_cau: number;
        }[];
    } & {
        id: string;
        created_at: Date;
        don_vi_id: string;
        nam_hoc: string;
        ngay_mo_cong: Date;
        ngay_dong_cong: Date;
        so_tieu_chi_dat: number;
    })[]>;
    saveQuyChe(dto: any, userPayload: any): Promise<{
        id: string;
        created_at: Date;
        don_vi_id: string;
        nam_hoc: string;
        ngay_mo_cong: Date;
        ngay_dong_cong: Date;
        so_tieu_chi_dat: number;
    }>;
    createDraft(userId: string, dto: CreateApplicationDto): Promise<{
        quy_che: {
            tieu_chis: {
                id: string;
                quy_che_id: string;
                thu_tu: number | null;
                ten_tieu_chi: string;
                mo_ta: string | null;
                so_luong_yeu_cau: number;
            }[];
        } & {
            id: string;
            created_at: Date;
            don_vi_id: string;
            nam_hoc: string;
            ngay_mo_cong: Date;
            ngay_dong_cong: Date;
            so_tieu_chi_dat: number;
        };
        minh_chungs: {
            id: string;
            nguoi_dung_id: string;
            trang_thai: string;
            created_at: Date;
            tieu_chi_id: string | null;
            loai: string;
            ten_minh_chung: string | null;
            file_url: string;
            ai_xac_thuc_muc_do: number | null;
            nguoi_duyet_id: string | null;
            ly_do_loai: string | null;
        }[];
    } & {
        id: string;
        nguoi_dung_id: string;
        quy_che_id: string;
        cap_hien_tai: string;
        trang_thai: import("shared-database").$Enums.TrangThaiHoSo;
        ai_flag: string | null;
        ghi_chu_ai: string | null;
        khoa: boolean;
        ngay_nop: Date | null;
        created_at: Date;
    }>;
    submitApplication(id: string, userId: string, minhChungIds: string[]): Promise<{
        id: string;
        nguoi_dung_id: string;
        quy_che_id: string;
        cap_hien_tai: string;
        trang_thai: import("shared-database").$Enums.TrangThaiHoSo;
        ai_flag: string | null;
        ghi_chu_ai: string | null;
        khoa: boolean;
        ngay_nop: Date | null;
        created_at: Date;
    }>;
    reviewApplication(id: string, dto: ReviewApplicationDto, user: any): Promise<{
        id: string;
        nguoi_dung_id: string;
        quy_che_id: string;
        cap_hien_tai: string;
        trang_thai: import("shared-database").$Enums.TrangThaiHoSo;
        ai_flag: string | null;
        ghi_chu_ai: string | null;
        khoa: boolean;
        ngay_nop: Date | null;
        created_at: Date;
    }>;
    escalateBatch(appIds: string[], user: any): Promise<{
        message: string;
    }>;
}
