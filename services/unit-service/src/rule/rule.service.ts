import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRuleDto, UpdateTimeWindowDto } from './dto';
import { VaiTro } from 'shared-database';

@Injectable()
export class RuleService {
  constructor(private prisma: PrismaService) {}

  async getAllRules() {
    return this.prisma.quyChe.findMany({
      include: { don_vi: true, tieu_chis: true },
    });
  }

  async createRule(dto: CreateRuleDto, user: any) {
    if (user.role === VaiTro.SINH_VIEN) {
      throw new ForbiddenException('Sinh viên không có quyền tạo quy chế');
    }

    const checkExist = await this.prisma.quyChe.findFirst({
      where: { don_vi_id: dto.don_vi_id, nam_hoc: dto.nam_hoc },
    });

    if (checkExist) {
      throw new BadRequestException('Quy chế cho năm học này đã tồn tại ở đơn vị này');
    }

    const rule = await this.prisma.quyChe.create({
      data: {
        don_vi_id: dto.don_vi_id,
        nam_hoc: dto.nam_hoc,
        ngay_mo_cong: new Date(dto.ngay_mo_cong),
        ngay_dong_cong: new Date(dto.ngay_dong_cong),
        so_tieu_chi_dat: dto.so_tieu_chi_dat || 5,
      },
    });

    const defaultTieuChis = ['Đạo đức tốt', 'Học tập tốt', 'Thể lực tốt', 'Tình nguyện tốt', 'Hội nhập tốt'];
    await this.prisma.tieuChi.createMany({
      data: defaultTieuChis.map((tc, i) => ({
        quy_che_id: rule.id,
        ten_tieu_chi: tc,
        thu_tu: i + 1,
      })),
    });

    console.log(`[Scheduler Mock] Đã lập lịch thông báo cho Quy chế ${rule.id}`);

    return this.prisma.quyChe.findUnique({
      where: { id: rule.id },
      include: { tieu_chis: true },
    });
  }

  async updateTimeWindow(id: string, dto: UpdateTimeWindowDto, user: any) {
    if (user.role === VaiTro.SINH_VIEN) {
      throw new ForbiddenException('Không có quyền');
    }

    const rule = await this.prisma.quyChe.update({
      where: { id },
      data: {
        ngay_mo_cong: new Date(dto.ngay_mo_cong),
        ngay_dong_cong: new Date(dto.ngay_dong_cong),
      },
    });

    console.log(`[Scheduler Mock] Cập nhật lịch thông báo cho Quy chế ${rule.id}`);
    return rule;
  }
}
