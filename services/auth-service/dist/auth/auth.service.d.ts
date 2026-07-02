import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto';
import { AuditService } from '../audit/audit.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private auditService;
    constructor(prisma: PrismaService, jwtService: JwtService, auditService: AuditService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            ho_ten: string;
            msv: string | null;
            khoa: any;
            vai_tro: import("shared-database").$Enums.VaiTro;
            don_vi_id: string | null;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        message: string;
        userId: string;
    }>;
    forgotPassword(email: string): Promise<{
        success: boolean;
        message: string;
        devOtp: string | undefined;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(email: string, otp: string, new_password: string): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyEkycReal(files: Express.Multer.File[]): Promise<{
        success: boolean;
        data: {
            ho_ten: any;
            cccd: any;
            ngay_sinh: any;
        };
    }>;
    private mockVnptEkyc;
    updateProfile(userId: string, data: any): Promise<{
        success: boolean;
        user: {
            id: string;
            email: string;
            ho_ten: string;
            msv: string | null;
            so_dien_thoai: string | null;
            vai_tro: import("shared-database").$Enums.VaiTro;
            don_vi_id: string | null;
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        ho_ten: string;
        msv: string | null;
        so_dien_thoai: string | null;
        khoa: any;
        vai_tro: import("shared-database").$Enums.VaiTro;
        don_vi_id: string | null;
    }>;
}
