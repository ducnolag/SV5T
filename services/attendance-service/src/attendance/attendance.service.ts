import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as xlsx from 'xlsx';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async processExcelUpload(activityId: string, fileBuffer: Buffer) {
    const activity = await this.prisma.hoatDong.findUnique({
      where: { id: activityId },
    });
    if (!activity) {
      throw new NotFoundException('Không tìm thấy hoạt động');
    }

    try {
      const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data: any[] = xlsx.utils.sheet_to_json(sheet);

      if (data.length === 0) {
        throw new BadRequestException('File Excel trống');
      }

      let successCount = 0;
      let failedCount = 0;
      const failedMsvs: string[] = [];

      for (const row of data) {
        const msv = row['MSV'] || row['Mã SV'] || row['Mã Sinh Viên'] || row['msv'];
        if (!msv) { failedCount++; continue; }

        const user = await this.prisma.nguoiDung.findFirst({
          where: { msv: String(msv) },
        });

        if (!user) {
          failedCount++;
          failedMsvs.push(msv);
          continue;
        }

        try {
          await this.prisma.diemDanh.create({
            data: {
              hoat_dong_id: activityId,
              nguoi_dung_id: user.id,
              phuong_thuc: 'UPLOAD_EXCEL',
            },
          });
          successCount++;
        } catch {
          failedCount++;
        }
      }

      return {
        message: 'Xử lý điểm danh hoàn tất',
        success_count: successCount,
        failed_count: failedCount,
        failed_msvs: failedMsvs,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Lỗi định dạng file Excel');
    }
  }

  async getAttendanceList(activityId: string) {
    return this.prisma.diemDanh.findMany({
      where: { hoat_dong_id: activityId },
      include: {
        nguoi_dung: {
          select: { id: true, ho_ten: true, msv: true, email: true },
        },
      },
    });
  }
}
