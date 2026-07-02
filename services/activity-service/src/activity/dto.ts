import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty()
  @IsString()
  don_vi_tc_id: string;

  @IsNotEmpty()
  @IsString()
  ten_hoat_dong: string;

  @IsOptional()
  @IsString()
  mo_ta?: string;

  @IsNotEmpty()
  @IsString()
  tieu_chi_id: string;

  @IsNotEmpty()
  @IsString()
  thoi_gian_bat_dau: string;

  @IsNotEmpty()
  @IsString()
  thoi_gian_ket_thuc: string;

  @IsNotEmpty()
  @IsEnum(['CAMERA_VNFACE', 'UPLOAD_EXCEL', 'CAMERA', 'EXCEL', 'KET_HOP'])
  hinh_thuc_dd: string;
}

export class ApproveActivityDto {
  @IsNotEmpty()
  @IsEnum(['CHO_DUYET', 'DA_DUYET', 'TU_CHOI', 'DA_CHOT'])
  trang_thai: string;
}
