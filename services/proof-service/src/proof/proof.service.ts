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

  async uploadProof(userId: string, tieuChiId: string | null, file: Express.Multer.File, hoSoId?: string, ocrValid?: string) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);

    let trangThai = 'DANG_XL';
    let aiScore: number | null = null;
    let resolvedTieuChiId = tieuChiId;

    try {
      // 1. Lấy VNPT token từ file api.md
      const apiMd = fs.readFileSync('d:/hackathon/api.md', 'utf8');
      const tokenIdMatch = apiMd.match(/Token ID: (.+)/);
      const tokenKeyMatch = apiMd.match(/Token Key: (.+)/);
      const accessTokenMatch = apiMd.match(/Access Token: (Bearer .+)/);

      const tokenId = tokenIdMatch ? tokenIdMatch[1].trim() : '';
      const tokenKey = tokenKeyMatch ? tokenKeyMatch[1].trim() : '';
      const authen = accessTokenMatch ? accessTokenMatch[1].trim() : '';

      const baseUrl = 'https://api.idg.vnpt.vn';
      const FormData = require('form-data');

      // 2. Upload file lên VNPT
      const form = new FormData();
      form.append('file', file.buffer, { filename: file.originalname, contentType: file.mimetype });
      form.append('title', 'minh-chung');
      form.append('description', 'minh-chung-sv5t');

      const uploadRes = await axios.post(`${baseUrl}/file-service/v1/addFile`, form, {
        headers: {
          ...form.getHeaders(),
          'Token-id': tokenId,
          'Token-key': tokenKey,
          'mac-address': 'WEB-001',
          'Authorization': authen
        },
      });
      const fileHash = uploadRes.data.object.hash;

      // 3. Lấy public URL (để đưa cho SmartVision)
      const urlRes = await axios.get(`${baseUrl}/proxy-service/url-file?hash=${encodeURIComponent(fileHash)}`, {
        headers: {
          'Token-id': tokenId,
          'Token-key': tokenKey,
          'Authorization': authen
        }
      });
      const publicUrl = urlRes.data.object;

      // 4. Gọi SmartVision detect-people (Kiểm tra xem ảnh có người tham gia không)
      const detectRes = await axios.post(`${baseUrl}/data-service/v1/smartvision/detect-people`, {
        data: publicUrl
      }, {
        headers: {
          'Token-id': tokenId,
          'Token-key': tokenKey,
          'Authorization': authen,
          'Content-Type': 'application/json'
        }
      });

      // 5. Mô phỏng Face Compare với eKYC (So sánh với ảnh CCCD lúc đăng ký)
      // Trong thực tế sẽ lấy hash img_face của user từ DB
      const dummyFaceHash = "idg20260702-559c6976-95b5-4479-e063-63199f0a9a27/IDG01_aaae9124-75ea-11f1-bce8-415d381e887c";
      let isFaceMatched = false;
      try {
        const compareRes = await axios.post(`${baseUrl}/ai/v1/web/face/compare`, {
           img_front: dummyFaceHash,
           img_face: fileHash, // Lấy khuôn mặt trong minh chứng so với khuôn mặt gốc
           client_session: "WEB-SDK_Chrome",
           token: "test"
        }, {
           headers: {
             'Token-id': tokenId,
             'Token-key': tokenKey,
             'Authorization': authen,
             'mac-address': 'WEB-001',
           }
        });
        if (compareRes.data?.object?.msg === 'MATCH') {
           isFaceMatched = true;
        }
      } catch(e) {
        // Face compare failed usually means no face detected or mismatch, fallback to detect-people score
      }

      // 6. Tính điểm AI
      if (ocrValid === 'true') {
         aiScore = 85;
         trangThai = 'DA_XAC_THUC';
      } else {
         const peopleCount = detectRes.data?.object?.length || 0;
         if (isFaceMatched) {
           aiScore = 95;
           trangThai = 'DA_XAC_THUC';
         } else if (peopleCount > 0) {
           aiScore = 65; 
           trangThai = 'CAN_KIEM_TRA';
         } else {
           aiScore = 20; 
           trangThai = 'CAN_KIEM_TRA';
         }
      }
    } catch (e) {
      console.error('[AI VNPT] Lỗi tích hợp:', e.response?.data || e.message);
      trangThai = ocrValid === 'true' ? 'DA_XAC_THUC' : 'DANG_XL';
      aiScore = ocrValid === 'true' ? 85 : null;
    }

    const data: any = {
      nguoi_dung_id: userId,
      tieu_chi_id: resolvedTieuChiId || null,
      loai: 'BEN_NGOAI',
      file_url: `/uploads/${fileName}`,
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
