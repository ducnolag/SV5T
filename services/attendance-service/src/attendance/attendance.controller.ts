import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, UseGuards, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttendanceService } from './attendance.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('attendance')
@UseGuards(AuthGuard('jwt'))
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('excel/:activityId')
  @UseInterceptors(FileInterceptor('file'))
  uploadExcel(@Param('activityId') activityId: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file Excel');
    }
    return this.attendanceService.processExcelUpload(activityId, file.buffer);
  }

  @Get(':activityId')
  getList(@Param('activityId') activityId: string) {
    return this.attendanceService.getAttendanceList(activityId);
  }
}
