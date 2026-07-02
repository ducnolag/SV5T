import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto, ReviewApplicationDto } from './dto';
import { TrangThaiHoSo, VaiTro } from 'shared-database';
import axios from 'axios';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async getMyApplications(userId: string) {
    return this.prisma.hoSo.findMany({
      where: { nguoi_dung_id: userId },
      include: {
        quy_che: { include: { tieu_chis: true } },
        minh_chungs: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getPendingApplications(user: any) {
    // Cán bộ xem hồ sơ chờ duyệt theo cấp của mình
    const pendingStateMap: Record<string, TrangThaiHoSo[]> = {
      [VaiTro.CB_TRUONG]: [TrangThaiHoSo.CHO_DUYET_TRUONG, TrangThaiHoSo.DAT_TRUONG],
      [VaiTro.CB_TINH]: [TrangThaiHoSo.CHO_DUYET_TINH, TrangThaiHoSo.DAT_TINH],
      [VaiTro.CB_TW]: [TrangThaiHoSo.CHO_DUYET_TW, TrangThaiHoSo.DAT_SV5T],
      [VaiTro.ADMIN]: [TrangThaiHoSo.CHO_DUYET_TRUONG, TrangThaiHoSo.DAT_TRUONG, TrangThaiHoSo.CHO_DUYET_TINH, TrangThaiHoSo.DAT_TINH, TrangThaiHoSo.CHO_DUYET_TW, TrangThaiHoSo.DAT_SV5T],
    };
    const states = pendingStateMap[user.role] || [];
    return this.prisma.hoSo.findMany({
      where: { trang_thai: { in: states } },
      include: {
        nguoi_dung: { select: { id: true, ho_ten: true, msv: true, email: true } },
        quy_che: { include: { tieu_chis: true } },
        minh_chungs: true,
      },
      orderBy: { ngay_nop: 'asc' },
    });
  }

  async getQuyChes() {
    return this.prisma.quyChe.findMany({
      include: { tieu_chis: true, don_vi: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async createDraft(userId: string, dto: CreateApplicationDto) {
    const existing = await this.prisma.hoSo.findUnique({
      where: {
        nguoi_dung_id_quy_che_id: {
          nguoi_dung_id: userId,
          quy_che_id: dto.quy_che_id,
        }
      }
    });

    if (existing) {
      throw new BadRequestException('Hồ sơ cho quy chế này đã tồn tại');
    }

    return this.prisma.hoSo.create({
      data: {
        nguoi_dung_id: userId,
        quy_che_id: dto.quy_che_id,
        trang_thai: TrangThaiHoSo.DANG_TAO,
        cap_hien_tai: 'TRUONG',
        minh_chungs: dto.minh_chung_ids?.length
          ? { connect: dto.minh_chung_ids.map(id => ({ id })) }
          : undefined,
      },
      include: {
        minh_chungs: true,
        quy_che: { include: { tieu_chis: true } },
      }
    });
  }

  async submitApplication(id: string, userId: string) {
    const app = await this.prisma.hoSo.findUnique({
      where: { id },
      include: { minh_chungs: true }
    });

    if (!app || app.nguoi_dung_id !== userId) {
      throw new NotFoundException('Không tìm thấy hồ sơ');
    }

    if (app.trang_thai !== TrangThaiHoSo.DANG_TAO) {
      throw new BadRequestException('Chỉ có thể nộp hồ sơ ở trạng thái nháp');
    }

    // AI sơ duyệt: phân loại Xanh/Vàng/Đỏ
    const aiFlag = app.minh_chungs.length >= 5 ? 'XANH' : app.minh_chungs.length >= 3 ? 'VANG' : 'DO';
    const ghiChuAi = `AI sơ duyệt: ${app.minh_chungs.length} minh chứng. Phân loại ${aiFlag}.`;

    const updated = await this.prisma.hoSo.update({
      where: { id },
      data: {
        trang_thai: TrangThaiHoSo.CHO_DUYET_TRUONG,
        khoa: true,
        ngay_nop: new Date(),
        ai_flag: aiFlag,
        ghi_chu_ai: ghiChuAi,
      }
    });
    try {
      await axios.post('http://localhost:3007/internal/broadcast', { message: 'REFRESH_APPLICATIONS' });
    } catch (e) {}
    return updated;
  }

  async reviewApplication(id: string, dto: ReviewApplicationDto, user: any) {
    if (user.role === VaiTro.SINH_VIEN) {
      throw new ForbiddenException('Sinh viên không được duyệt hồ sơ');
    }

    const app = await this.prisma.hoSo.findUnique({ where: { id } });
    if (!app) {
      throw new NotFoundException('Không tìm thấy hồ sơ');
    }

    // Role-based logic
    if (app.trang_thai === TrangThaiHoSo.CHO_DUYET_TRUONG && user.role !== VaiTro.CB_TRUONG && user.role !== VaiTro.ADMIN) {
        throw new ForbiddenException('Chỉ Cán bộ Trường mới có quyền duyệt hồ sơ cấp Trường');
    }
    if (app.trang_thai === TrangThaiHoSo.CHO_DUYET_TINH && user.role !== VaiTro.CB_TINH && user.role !== VaiTro.ADMIN) {
        throw new ForbiddenException('Chỉ Cán bộ Tỉnh mới có quyền duyệt hồ sơ cấp Tỉnh');
    }
    if (app.trang_thai === TrangThaiHoSo.CHO_DUYET_TW && user.role !== VaiTro.CB_TW && user.role !== VaiTro.ADMIN) {
        throw new ForbiddenException('Chỉ Cán bộ TW mới có quyền duyệt hồ sơ cấp TW');
    }

    const updatedApp = await this.prisma.hoSo.update({
      where: { id },
      data: {
        trang_thai: dto.trang_thai as TrangThaiHoSo,
      }
    });

    try {
      const notifyUrl = process.env.NOTIFICATION_URL || 'http://localhost:3007';
      const stateLabel: Record<string, string> = {
        DAT_TRUONG: '✅ Đạt cấp Trường',
        DAT_TINH: '✅ Đạt cấp Tỉnh/TP',
        DAT_SV5T: '🏆 Đạt danh hiệu SV5T!',
        BI_TU_CHOI: '❌ Bị từ chối',
      };
      await axios.post(`${notifyUrl}/internal/notify`, {
        userId: updatedApp.nguoi_dung_id,
        message: `Hồ sơ SV5T của bạn: ${stateLabel[dto.trang_thai] || dto.trang_thai}`,
      });
      await axios.post(`${notifyUrl}/internal/broadcast`, { message: 'REFRESH_APPLICATIONS' });
    } catch (e) {
      console.error('Lỗi khi gửi thông báo:', e.message);
    }

    return updatedApp;
  }

  async escalateBatch(appIds: string[], user: any) {
    if (user.role !== VaiTro.CB_TRUONG && user.role !== VaiTro.CB_TINH && user.role !== VaiTro.ADMIN) {
        throw new ForbiddenException('Bạn không có quyền trình tuyến trên');
    }

    const apps = await this.prisma.hoSo.findMany({
        where: { id: { in: appIds } }
    });

    for (const app of apps) {
        let nextState: TrangThaiHoSo = app.trang_thai;
        let nextCap = app.cap_hien_tai;
        if (app.trang_thai === TrangThaiHoSo.DAT_TRUONG) {
            nextState = TrangThaiHoSo.CHO_DUYET_TINH;
            nextCap = 'TINH';
        } else if (app.trang_thai === TrangThaiHoSo.DAT_TINH) {
            nextState = TrangThaiHoSo.CHO_DUYET_TW;
            nextCap = 'TW';
        } else {
            throw new BadRequestException(`Hồ sơ ${app.id} không ở trạng thái hợp lệ để trình tuyến trên`);
        }

        await this.prisma.hoSo.update({
            where: { id: app.id },
            data: { trang_thai: nextState, cap_hien_tai: nextCap }
        });
    }

    try {
      await axios.post('http://localhost:3007/internal/broadcast', { message: 'REFRESH_APPLICATIONS' });
    } catch (e) {}

    return { message: `Đã trình tuyến trên thành công ${apps.length} hồ sơ` };
  }
}
