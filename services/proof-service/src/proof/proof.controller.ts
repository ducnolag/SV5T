import { Controller, Post, Get, Put, Delete, Body, Param, UseInterceptors, UploadedFiles, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProofService } from './proof.service';
import { ReviewProofDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('proofs')
@UseGuards(AuthGuard('jwt'))
export class ProofController {
  constructor(private readonly proofService: ProofService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  upload(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('tieu_chi_id') tieuChiId: string,
    @Body('ho_so_id') hoSoId: string,
    @Body('ocr_valid') ocrValid: string,
    @Body('ten_minh_chung') tenMinhChung: string,
    @Body('ai_mismatch') aiMismatch: string,
    @Body('ai_suggestion') aiSuggestion: string,
    @Request() req: any
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Vui lòng chọn file minh chứng');
    }
    const tieuChiIdOrNull = tieuChiId && tieuChiId.length > 0 ? tieuChiId : null;
    const hoSoIdOrUndefined = hoSoId && hoSoId.length > 0 ? hoSoId : undefined;
    const tenMinhChungOrNull = tenMinhChung && tenMinhChung.length > 0 ? tenMinhChung : null;
    return this.proofService.uploadProof(req.user.id, tieuChiIdOrNull, files, hoSoIdOrUndefined, ocrValid, tenMinhChungOrNull, aiMismatch, aiSuggestion);
  }

  @Get('me')
  getMyProofs(@Request() req: any) {
    return this.proofService.getMyProofs(req.user.id);
  }

  @Put(':id/review')
  review(@Param('id') id: string, @Body() dto: ReviewProofDto, @Request() req: any) {
    return this.proofService.reviewProof(id, dto, req.user);
  }

  @Delete(':id')
  deleteProof(@Param('id') id: string, @Request() req: any) {
    return this.proofService.deleteProof(id, req.user.id);
  }
}
