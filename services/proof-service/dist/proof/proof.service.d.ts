import { PrismaService } from '../prisma/prisma.service';
import { ReviewProofDto } from './dto';
export declare class ProofService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadProof(userId: string, tieuChiId: string | null, files: Express.Multer.File[], hoSoId?: string, ocrValid?: string, tenMinhChung?: string | null, aiMismatch?: string, aiSuggestion?: string): Promise<{
        tieu_chi: {
            id: string;
            quy_che_id: string;
            ten_tieu_chi: string;
            mo_ta: string | null;
            thu_tu: number | null;
            so_luong_yeu_cau: number;
        } | null;
    } & {
        id: string;
        loai: string;
        ten_minh_chung: string | null;
        file_url: string;
        trang_thai: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        ly_do_loai: string | null;
        created_at: Date;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
    }>;
    getMyProofs(userId: string): Promise<({
        tieu_chi: {
            id: string;
            quy_che_id: string;
            ten_tieu_chi: string;
            mo_ta: string | null;
            thu_tu: number | null;
            so_luong_yeu_cau: number;
        } | null;
    } & {
        id: string;
        loai: string;
        ten_minh_chung: string | null;
        file_url: string;
        trang_thai: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        ly_do_loai: string | null;
        created_at: Date;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
    })[]>;
    getAllPendingProofs(): Promise<({
        nguoi_dung: {
            id: string;
            msv: string | null;
            ho_ten: string;
        };
        tieu_chi: {
            id: string;
            quy_che_id: string;
            ten_tieu_chi: string;
            mo_ta: string | null;
            thu_tu: number | null;
            so_luong_yeu_cau: number;
        } | null;
    } & {
        id: string;
        loai: string;
        ten_minh_chung: string | null;
        file_url: string;
        trang_thai: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        ly_do_loai: string | null;
        created_at: Date;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
    })[]>;
    reviewProof(id: string, dto: ReviewProofDto, user: any): Promise<{
        id: string;
        loai: string;
        ten_minh_chung: string | null;
        file_url: string;
        trang_thai: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        ly_do_loai: string | null;
        created_at: Date;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
    }>;
    deleteProof(id: string, userId: string): Promise<{
        id: string;
        loai: string;
        ten_minh_chung: string | null;
        file_url: string;
        trang_thai: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        ly_do_loai: string | null;
        created_at: Date;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
    }>;
}
