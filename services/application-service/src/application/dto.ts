import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  quy_che_id: string;

  @IsArray()
  @IsString({ each: true })
  minh_chung_ids: string[];
}

export class ReviewApplicationDto {
  @IsNotEmpty()
  @IsEnum(['DAT_TRUONG', 'DAT_TINH', 'DAT_SV5T', 'BI_TU_CHOI'])
  trang_thai: string;
}
