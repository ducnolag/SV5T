import { PrismaService } from '../prisma/prisma.service';
import { CreateUnitDto } from './dto';
export declare class UnitService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUnits(): Promise<{
        ten_don_vi: string;
        cap_do: import("shared-database").$Enums.CapDo;
        parent_id: string | null;
        id: string;
        trang_thai: boolean;
        created_at: Date;
    }[]>;
    getTree(): Promise<any[]>;
    createUnit(dto: CreateUnitDto, user: any): Promise<{
        ten_don_vi: string;
        cap_do: import("shared-database").$Enums.CapDo;
        parent_id: string | null;
        id: string;
        trang_thai: boolean;
        created_at: Date;
    }>;
}
