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
        trang_thai: string;
        ly_do_loai: string | null;
        id: string;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
        loai: string;
        ten_minh_chung: string | null;
        file_url: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        created_at: Date;
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
        trang_thai: string;
        ly_do_loai: string | null;
        id: string;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
        loai: string;
        ten_minh_chung: string | null;
        file_url: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        created_at: Date;
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
        trang_thai: string;
        ly_do_loai: string | null;
        id: string;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
        loai: string;
        ten_minh_chung: string | null;
        file_url: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        created_at: Date;
    })[]>;
    reviewProof(id: string, dto: ReviewProofDto, user: any): Promise<{
        trang_thai: string;
        ly_do_loai: string | null;
        id: string;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
        loai: string;
        ten_minh_chung: string | null;
        file_url: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        created_at: Date;
    }>;
    deleteProof(id: string, userId: string): Promise<{
        trang_thai: string;
        ly_do_loai: string | null;
        id: string;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
        loai: string;
        ten_minh_chung: string | null;
        file_url: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        created_at: Date;
    }>;
}
