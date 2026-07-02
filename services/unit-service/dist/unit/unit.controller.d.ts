import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto';
export declare class UnitController {
    private readonly unitService;
    constructor(unitService: UnitService);
    getAll(): Promise<{
        ten_don_vi: string;
        cap_do: import("shared-database").$Enums.CapDo;
        parent_id: string | null;
        id: string;
        trang_thai: boolean;
        created_at: Date;
    }[]>;
    getTree(): Promise<any[]>;
    create(dto: CreateUnitDto, req: any): Promise<{
        ten_don_vi: string;
        cap_do: import("shared-database").$Enums.CapDo;
        parent_id: string | null;
        id: string;
        trang_thai: boolean;
        created_at: Date;
    }>;
}
