import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReviewProofDto {
  @IsNotEmpty()
  @IsEnum(['DA_XAC_THUC', 'CAN_KIEM_TRA', 'DA_DUYET', 'BI_LOAI'])
  trang_thai: string;

  @IsOptional()
  @IsString()
  ly_do_loai?: string;
}
