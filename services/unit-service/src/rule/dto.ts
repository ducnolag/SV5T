import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRuleDto {
  @IsNotEmpty()
  @IsString()
  don_vi_id: string;

  @IsNotEmpty()
  @IsString()
  nam_hoc: string;

  @IsNotEmpty()
  @IsDateString()
  ngay_mo_cong: string;

  @IsNotEmpty()
  @IsDateString()
  ngay_dong_cong: string;

  @IsOptional()
  @IsNumber()
  so_tieu_chi_dat?: number;
}

export class UpdateTimeWindowDto {
  @IsNotEmpty()
  @IsDateString()
  ngay_mo_cong: string;

  @IsNotEmpty()
  @IsDateString()
  ngay_dong_cong: string;
}
