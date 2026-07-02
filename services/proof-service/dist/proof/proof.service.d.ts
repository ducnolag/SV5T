import { PrismaService } from '../prisma/prisma.service';
import { ReviewProofDto } from './dto';
export declare class ProofService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadProof(userId: string, tieuChiId: string | null, file: Express.Multer.File): Promise<{
        tieu_chi: {
            id: string;
            quy_che_id: string;
            ten_tieu_chi: string;
            mo_ta: string | null;
            thu_tu: number | null;
        } | null;
    } & {
        trang_thai: string;
        ly_do_loai: string | null;
        id: string;
        loai: string;
        file_url: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
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
        } | null;
    } & {
        trang_thai: string;
        ly_do_loai: string | null;
        id: string;
        loai: string;
        file_url: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
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
        } | null;
    } & {
        trang_thai: string;
        ly_do_loai: string | null;
        id: string;
        loai: string;
        file_url: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        created_at: Date;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
    })[]>;
    reviewProof(id: string, dto: ReviewProofDto, user: any): Promise<{
        trang_thai: string;
        ly_do_loai: string | null;
        id: string;
        loai: string;
        file_url: string;
        ai_xac_thuc_muc_do: number | null;
        nguoi_duyet_id: string | null;
        created_at: Date;
        nguoi_dung_id: string;
        tieu_chi_id: string | null;
    }>;
}
