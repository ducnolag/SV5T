import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    ekycReal(files: Array<Express.Multer.File>): Promise<{
        success: boolean;
        data: {
            ho_ten: any;
            cccd: any;
            ngay_sinh: any;
        };
    }>;
    getProfile(req: any): any;
}
