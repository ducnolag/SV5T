import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CapDo } from 'shared-database';

export class CreateUnitDto {
  @IsNotEmpty()
  @IsString()
  ten_don_vi: string;

  @IsNotEmpty()
  @IsEnum(CapDo)
  cap_do: CapDo;

  @IsOptional()
  @IsString()
  parent_id?: string;
}
