import { VaiTro } from 'shared-database';
export declare class LoginDto {
    email: string;
    mat_khau: string;
}
export declare class RegisterDto {
    ho_ten: string;
    email: string;
    mat_khau: string;
    msv?: string;
    cccd: string;
    vai_tro?: VaiTro;
    don_vi_id?: string;
    so_dien_thoai?: string;
    province?: string;
    khoa?: string;
}
