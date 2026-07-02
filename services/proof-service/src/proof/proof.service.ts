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

  async uploadProof(userId: string, tieuChiId: string | null, file: Express.Multer.File) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);

    // Call AI OCR service
    let trangThai = 'DANG_XL';
    let aiScore: number | null = null;
    let resolvedTieuChiId = tieuChiId;

    try {
      const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:3008';
      const ocrRes = await axios.post(`${aiUrl}/ocr`, { imageUrl: fileName, userId });
      const ocrData = ocrRes.data;
      aiScore = Math.round((ocrData.confidenceScore || 0.85) * 100);
      // If confidence high, auto-validate
      trangThai = aiScore >= 75 ? 'DA_XAC_THUC' : 'CAN_KIEM_TRA';
      // Try to find suggested criteria
      if (!resolvedTieuChiId && ocrData.suggestedCriteria) {
        const tieuChi = await this.prisma.tieuChi.findFirst({
          where: { ten_tieu_chi: { contains: ocrData.suggestedCriteria.split(' ')[0] } }
        });
        if (tieuChi) resolvedTieuChiId = tieuChi.id;
      }
    } catch (e) {
      console.error('[AI OCR] Error:', e.message);
      trangThai = 'DANG_XL';
    }

    return this.prisma.minhChung.create({
      data: {
        nguoi_dung_id: userId,
        tieu_chi_id: resolvedTieuChiId || null,
        loai: 'BEN_NGOAI',
        file_url: `/uploads/${fileName}`,
        trang_thai: trangThai,
        ai_xac_thuc_muc_do: aiScore,
      },
      include: { tieu_chi: true },
    });
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
}
