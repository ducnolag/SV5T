import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto, ReviewApplicationDto } from './dto';
import { TrangThaiHoSo, VaiTro } from 'shared-database';
import axios from 'axios';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) { }

  async getMyApplications(userId: string) {
    return this.prisma.hoSo.findMany({
      where: { nguoi_dung_id: userId },
      include: {
        quy_che: { include: { tieu_chis: { orderBy: { thu_tu: 'asc' } } } },
        minh_chungs: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getApplicationById(id: string, user: any) {
    const app = await this.prisma.hoSo.findUnique({
      where: { id },
      include: {
        quy_che: { include: { tieu_chis: { orderBy: { thu_tu: 'asc' } } } },
        minh_chungs: { include: { tieu_chi: true } },
      }
    });
    if (!app) throw new NotFoundException('Không tìm thấy hồ sơ');
    if (user.role === VaiTro.SINH_VIEN && app.nguoi_dung_id !== user.id) {
      throw new ForbiddenException('Bạn không có quyền xem hồ sơ này');
    }
    return app;
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

    let userFilter = {};
    if (user.role === VaiTro.CB_TRUONG) {
      userFilter = { nguoi_dung: { don_vi_id: user.don_vi_id } };
    } else if (user.role === VaiTro.CB_TINH) {
      userFilter = { nguoi_dung: { don_vi: { parent_id: user.don_vi_id } } };
    } else if (user.role === VaiTro.CB_TW) {
      // TW can see all that reached TW
    }

    return this.prisma.hoSo.findMany({
      where: {
        trang_thai: { in: states },
        ...userFilter
      },
      include: {
        nguoi_dung: { select: { id: true, ho_ten: true, msv: true, email: true } },
        quy_che: { include: { tieu_chis: true } },
        minh_chungs: true,
      },
      orderBy: { ngay_nop: 'asc' },
    });
  }

  async getQuyChes(userPayload: any) {
    const dbUser = await this.prisma.nguoiDung.findUnique({ where: { id: userPayload.id } });
    if (!dbUser) return [];

    if (dbUser.vai_tro === VaiTro.ADMIN && !dbUser.don_vi_id) {
      return this.prisma.quyChe.findMany({
        include: { tieu_chis: true, don_vi: true },
        orderBy: { created_at: 'desc' },
      });
    }

    const donViIds = [];
    if (dbUser.don_vi_id) {
      let currentDonVi = await this.prisma.donVi.findUnique({ where: { id: dbUser.don_vi_id } });
      while (currentDonVi) {
        donViIds.push(currentDonVi.id);
        if (currentDonVi.parent_id) {
          currentDonVi = await this.prisma.donVi.findUnique({ where: { id: currentDonVi.parent_id } });
        } else {
          break;
        }
      }
    }

    return this.prisma.quyChe.findMany({
      where: { don_vi_id: { in: donViIds } },
      include: { tieu_chis: true, don_vi: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async saveQuyChe(dto: any, userPayload: any) {
    const dbUser = await this.prisma.nguoiDung.findUnique({ where: { id: userPayload.id } });
    if (!dbUser) throw new Error("Không tìm thấy người dùng");
    let donViId = dbUser.don_vi_id;

    if (!donViId && dbUser.vai_tro === VaiTro.ADMIN) {
      const truong = await this.prisma.donVi.findFirst({ where: { cap_do: 'TRUONG' } });
      if (truong) donViId = truong.id;
    }
    if (!donViId) throw new Error("Cán bộ không có đơn vị trực thuộc");

    // Upsert QuyChe by nam_hoc and don_vi_id
    const quyChe = await this.prisma.quyChe.upsert({
      where: {
        don_vi_id_nam_hoc: { don_vi_id: donViId, nam_hoc: dto.nam_hoc }
      },
      update: {
        ngay_mo_cong: new Date(dto.ngay_mo_cong),
        ngay_dong_cong: new Date(dto.ngay_dong_cong),
      },
      create: {
        don_vi_id: donViId,
        nam_hoc: dto.nam_hoc,
        ngay_mo_cong: new Date(dto.ngay_mo_cong),
        ngay_dong_cong: new Date(dto.ngay_dong_cong),
      }
    });

    // Save tieu_chis
    for (const tc of dto.tieu_chis) {
      // Upsert tieu chi
      const existingTc = await this.prisma.tieuChi.findFirst({
        where: { quy_che_id: quyChe.id, ten_tieu_chi: tc.ten_tieu_chi }
      });
      if (existingTc) {
        await this.prisma.tieuChi.update({
          where: { id: existingTc.id },
          data: { mo_ta: tc.mo_ta, thu_tu: tc.thu_tu, so_luong_yeu_cau: tc.so_luong_yeu_cau }
        });
      } else {
        await this.prisma.tieuChi.create({
          data: {
            quy_che_id: quyChe.id,
            ten_tieu_chi: tc.ten_tieu_chi,
            mo_ta: tc.mo_ta,
            thu_tu: tc.thu_tu,
            so_luong_yeu_cau: tc.so_luong_yeu_cau
          }
        });
      }
    }

    return quyChe;
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

  async submitApplication(id: string, userId: string, minhChungIds: string[]) {
    let app = await this.prisma.hoSo.findUnique({
      where: { id },
      include: { minh_chungs: { include: { tieu_chi: true } }, quy_che: { include: { tieu_chis: true } } }
    });

    if (!app || app.nguoi_dung_id !== userId) {
      throw new NotFoundException('Không tìm thấy hồ sơ');
    }

    if (app.trang_thai !== TrangThaiHoSo.DANG_TAO) {
      throw new BadRequestException('Chỉ có thể nộp hồ sơ ở trạng thái nháp');
    }

    // Connect the provided minh_chung_ids to the HoSo
    if (minhChungIds && minhChungIds.length > 0) {
      await this.prisma.hoSo.update({
        where: { id },
        data: {
          minh_chungs: {
            set: [], // Clear existing
            connect: minhChungIds.map(mcId => ({ id: mcId }))
          }
        }
      });
      // Re-fetch app with updated proofs
      app = await this.prisma.hoSo.findUnique({
        where: { id },
        include: { minh_chungs: { include: { tieu_chi: true } }, quy_che: { include: { tieu_chis: true } } }
      });

      if (!app) {
        throw new NotFoundException('Không tìm thấy hồ sơ');
      }
    }

    // Check criteria completion
    // Lọc trùng lặp tiêu chí theo tên để hỗ trợ 1 minh chứng dùng cho nhiều cấp
    const uniqueTcsMap = new Map();
    for (const tc of app.quy_che.tieu_chis) {
      uniqueTcsMap.set(tc.ten_tieu_chi.trim().toLowerCase(), tc);
    }
    const uniqueTcs = Array.from(uniqueTcsMap.values());

    for (const tc of uniqueTcs) {
      const tcProofs = app.minh_chungs.filter(mc =>
        mc.tieu_chi_id === tc.id ||
        app.quy_che.tieu_chis.find(t => t.id === mc.tieu_chi_id)?.ten_tieu_chi?.trim().toLowerCase() === tc.ten_tieu_chi.trim().toLowerCase() ||
        // Check if mc has populated tieu_chi (it might not be populated in findUnique)
        (mc as any).tieu_chi?.ten_tieu_chi?.trim().toLowerCase() === tc.ten_tieu_chi.trim().toLowerCase()
      );
      if (tcProofs.length < tc.so_luong_yeu_cau) {
        throw new BadRequestException(`Tiêu chí "${tc.ten_tieu_chi}" chưa đủ minh chứng.`);
      }
    }

    // AI sơ duyệt: phân loại Xanh/Vàng/Đỏ
    const totalAiScore = app.minh_chungs.reduce((acc, mc) => acc + (mc.ai_xac_thuc_muc_do || 0), 0);
    const avgAiScore = totalAiScore / Math.max(app.minh_chungs.length, 1);
    let aiFlag = 'DO';
    if (avgAiScore > 85) aiFlag = 'XANH';
    else if (avgAiScore > 50) aiFlag = 'VANG';

    const ghiChuAi = `AI sơ duyệt: Điểm eKYC trung bình ${avgAiScore.toFixed(1)}%. Phân loại ${aiFlag}.`;

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
    } catch (e) { }
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
        DAT_TRUONG: '🏆 Đạt danh hiệu SV5T cấp Trường!',
        DAT_TINH: '🏆 Đạt danh hiệu SV5T cấp Tỉnh/Thành phố!',
        DAT_SV5T: '🏆 Đạt danh hiệu SV5T cấp Trung ương!',
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
    } catch (e) { }

    return { message: `Đã trình tuyến trên thành công ${apps.length} hồ sơ` };
  }
}
