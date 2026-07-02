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
            vai_tro: import("shared-database").$Enums.VaiTro;
            don_vi_id: string | null;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        message: string;
        userId: string;
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
}
