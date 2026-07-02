import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewProofDto } from './dto';
import { VaiTro } from 'shared-database';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class ProofService {
  constructor(private prisma: PrismaService) {}

  async uploadProof(userId: string, tieuChiId: string | null, files: Express.Multer.File[], hoSoId?: string, ocrValid?: string, tenMinhChung?: string | null) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileUrls: string[] = [];
    for (const file of files) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, file.buffer);
      fileUrls.push(`/uploads/${fileName}`);
    }

    let trangThai = 'DANG_XL';
    let aiScore: number | null = null;
    let resolvedTieuChiId = tieuChiId;

    if (ocrValid === 'true') {
      trangThai = 'DA_XAC_THUC';
      aiScore = 95;
    } else {
      // Fallback
      aiScore = 60;
      trangThai = 'CAN_KIEM_TRA';
    }

    const data: any = {
      nguoi_dung_id: userId,
      tieu_chi_id: resolvedTieuChiId || null,
      loai: 'BEN_NGOAI',
      ten_minh_chung: tenMinhChung,
      file_url: JSON.stringify(fileUrls), // Lưu dạng chuỗi JSON mảng
      trang_thai: trangThai,
      ai_xac_thuc_muc_do: aiScore,
    };

    const newProof = await this.prisma.minhChung.create({
      data,
      include: { tieu_chi: true },
    });

    // Tự động gán vào Hồ sơ nếu frontend có truyền lên
    if (hoSoId) {
      await this.prisma.hoSo.update({
        where: { id: hoSoId },
        data: { minh_chungs: { connect: { id: newProof.id } } }
      });
    }

    return newProof;
  }

  async getMyProofs(userId: string) {
    return this.prisma.minhChung.findMany({
      where: { nguoi_dung_id: userId },
      include: { tieu_chi: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async getAllPendingProofs() {
    return this.prisma.minhChung.findMany({
      where: { trang_thai: { in: ['CAN_KIEM_TRA', 'DANG_XL'] } },
      include: {
        tieu_chi: true,
        nguoi_dung: { select: { id: true, ho_ten: true, msv: true } },
      },
      orderBy: { created_at: 'asc' },
    });
  }

  async reviewProof(id: string, dto: ReviewProofDto, user: any) {
    if (user.role === VaiTro.SINH_VIEN || user.role === VaiTro.LCH_CLB) {
      throw new ForbiddenException('Bạn không có quyền duyệt minh chứng');
    }

    const proof = await this.prisma.minhChung.findUnique({ where: { id } });
    if (!proof) {
      throw new NotFoundException('Không tìm thấy minh chứng');
    }

    return this.prisma.minhChung.update({
      where: { id },
      data: {
        trang_thai: dto.trang_thai,
        nguoi_duyet_id: user.id,
        ly_do_loai: dto.ly_do_loai,
      },
    });
  }

  async deleteProof(id: string, userId: string) {
    const proof = await this.prisma.minhChung.findUnique({ where: { id } });
    if (!proof) throw new NotFoundException('Không tìm thấy minh chứng');
    if (proof.nguoi_dung_id !== userId) throw new ForbiddenException('Không có quyền xóa');
    return this.prisma.minhChung.delete({ where: { id } });
  }
}
