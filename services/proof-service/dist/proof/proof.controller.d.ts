import { ProofService } from './proof.service';
import { ReviewProofDto } from './dto';
export declare class ProofController {
    private readonly proofService;
    constructor(proofService: ProofService);
    upload(files: Array<Express.Multer.File>, tieuChiId: string, hoSoId: string, ocrValid: string, tenMinhChung: string, req: any): Promise<{
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
    getMyProofs(req: any): Promise<({
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
    review(id: string, dto: ReviewProofDto, req: any): Promise<{
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
    deleteProof(id: string, req: any): Promise<{
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
