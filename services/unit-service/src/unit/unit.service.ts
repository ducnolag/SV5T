import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUnitDto } from './dto';
import { VaiTro } from 'shared-database';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  async getAllUnits() {
    return this.prisma.donVi.findMany({
      where: { trang_thai: true },
      orderBy: { ten_don_vi: 'asc' },
    });
  }

  async getTree() {
    // Lấy tất cả đơn vị và build tree
    const all = await this.prisma.donVi.findMany({
      where: { trang_thai: true },
      orderBy: [{ cap_do: 'asc' }, { ten_don_vi: 'asc' }],
    });
    // Build tree bằng cách lọc root nodes (không có parent)
    const buildTree = (items: any[], parentId: string | null): any[] => {
      return items
        .filter(item => item.parent_id === parentId)
        .map(item => ({
          ...item,
          children: buildTree(items, item.id),
        }));
    };
    return buildTree(all, null);
  }

  async createUnit(dto: CreateUnitDto, user: any) {
    if (user.role === VaiTro.SINH_VIEN || user.role === VaiTro.LCH_CLB) {
      throw new ForbiddenException('Không có quyền tạo đơn vị');
    }

    return this.prisma.donVi.create({
      data: {
        ten_don_vi: dto.ten_don_vi,
        cap_do: dto.cap_do,
        parent_id: dto.parent_id,
      },
    });
  }
}
