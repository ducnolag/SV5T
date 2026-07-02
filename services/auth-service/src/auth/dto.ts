import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { VaiTro } from 'shared-database';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  mat_khau: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  ho_ten: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  mat_khau: string;

  @IsNotEmpty()
  @IsString()
  msv: string;

  @IsNotEmpty()
  @IsString()
  cccd: string;

  @IsOptional()
  @IsString()
  vai_tro?: VaiTro;

  @IsOptional()
  @IsString()
  don_vi_id?: string;

  @IsOptional()
  @IsString()
  so_dien_thoai?: string;
}
