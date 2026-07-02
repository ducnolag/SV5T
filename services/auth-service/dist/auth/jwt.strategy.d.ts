import { Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: any): Promise<{
        email: string;
        mat_khau: string;
        ho_ten: string;
        msv: string | null;
        cccd: string | null;
        vai_tro: import("shared-database").$Enums.VaiTro;
        don_vi_id: string | null;
        so_dien_thoai: string | null;
        id: string;
        trang_thai: import("shared-database").$Enums.TrangThaiTK;
        reset_otp: string | null;
        reset_otp_expires: Date | null;
        created_at: Date;
    }>;
}
export {};
