import { ProofService } from './proof.service';
import { ReviewProofDto } from './dto';
export declare class ProofController {
    private readonly proofService;
    constructor(proofService: ProofService);
    upload(file: Express.Multer.File, tieuChiId: string, req: any): Promise<{
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
    getMyProofs(req: any): Promise<({
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
    review(id: string, dto: ReviewProofDto, req: any): Promise<{
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
