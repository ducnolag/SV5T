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
    forgotPassword(body: {
        email: string;
    }): Promise<{
        success: boolean;
        message: string;
        devOtp: string | undefined;
    }>;
    verifyOtp(body: {
        email: string;
        otp: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(body: {
        email: string;
        otp: string;
        new_password: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    getProfile(req: any): any;
}
