import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto, ApproveActivityDto } from './dto';
import { VaiTro } from 'shared-database';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async getAllActivities() {
    return this.prisma.hoatDong.findMany({
      include: {
        tieu_chis: true,
        don_vi_tc: true,
      },
    });
  }

  async createActivity(dto: CreateActivityDto, user: any) {
    if (user.role === VaiTro.SINH_VIEN) {
      throw new ForbiddenException('Sinh viên không được tạo hoạt động');
    }

    const created = await this.prisma.hoatDong.create({
      data: {
        don_vi_tc_id: dto.don_vi_tc_id,
        ten_hoat_dong: dto.ten_hoat_dong,
        hinh_thuc_dd: dto.hinh_thuc_dd,
        thoi_gian_bat_dau: new Date(dto.thoi_gian_bat_dau),
        thoi_gian_ket_thuc: new Date(dto.thoi_gian_ket_thuc),
        trang_thai: 'CHO_DUYET',
        tieu_chis: {
          connect: {
            id: dto.tieu_chi_id,
          }
        }
      }
    });
    try {
      const axios = require('axios');
      await axios.post('http://localhost:3007/internal/broadcast', { message: 'REFRESH_ACTIVITIES' });
    } catch (e) {}
    return created;
  }

  async approveActivity(id: string, dto: ApproveActivityDto, user: any) {
    if (user.role === VaiTro.SINH_VIEN) {
      throw new ForbiddenException('Không có quyền duyệt');
    }

    const activity = await this.prisma.hoatDong.findUnique({
      where: { id },
      include: { don_vi_tc: true },
    });

    if (!activity) {
      throw new NotFoundException('Không tìm thấy hoạt động');
    }

    // Role B: Auto approve if creating own unit's activity, else review.
    // In Hackathon MVP, we just update status.
    const updated = await this.prisma.hoatDong.update({
      where: { id },
      data: {
        trang_thai: dto.trang_thai,
      },
    });
    try {
      const axios = require('axios');
      await axios.post('http://localhost:3007/internal/broadcast', { message: 'REFRESH_ACTIVITIES' });
    } catch (e) {}
    return updated;
  }
}
