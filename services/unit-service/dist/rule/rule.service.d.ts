import { PrismaService } from '../prisma/prisma.service';
import { CreateRuleDto, UpdateTimeWindowDto } from './dto';
export declare class RuleService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllRules(): Promise<({
        don_vi: {
            ten_don_vi: string;
            cap_do: import("shared-database").$Enums.CapDo;
            parent_id: string | null;
            id: string;
            trang_thai: boolean;
            created_at: Date;
        };
        tieu_chis: {
            id: string;
            quy_che_id: string;
            ten_tieu_chi: string;
            mo_ta: string | null;
            thu_tu: number | null;
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
    createRule(dto: CreateRuleDto, user: any): Promise<({
        tieu_chis: {
            id: string;
            quy_che_id: string;
            ten_tieu_chi: string;
            mo_ta: string | null;
            thu_tu: number | null;
        }[];
    } & {
        id: string;
        created_at: Date;
        don_vi_id: string;
        nam_hoc: string;
        ngay_mo_cong: Date;
        ngay_dong_cong: Date;
        so_tieu_chi_dat: number;
    }) | null>;
    updateTimeWindow(id: string, dto: UpdateTimeWindowDto, user: any): Promise<{
        id: string;
        created_at: Date;
        don_vi_id: string;
        nam_hoc: string;
        ngay_mo_cong: Date;
        ngay_dong_cong: Date;
        so_tieu_chi_dat: number;
    }>;
}
