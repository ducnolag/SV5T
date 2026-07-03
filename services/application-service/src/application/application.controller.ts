import { Controller, Post, Put, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto, ReviewApplicationDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('applications')
@UseGuards(AuthGuard('jwt'))
export class ApplicationController {
  constructor(private readonly appService: ApplicationService) {}

  @Get('my')
  getMyApplications(@Request() req: any) {
    return this.appService.getMyApplications(req.user.id);
  }

  @Get('pending')
  getPendingApplications(@Request() req: any) {
    return this.appService.getPendingApplications(req.user);
  }

  @Get('quy-ches')
  getQuyChes() {
    return this.appService.getQuyChes();
  }

  @Post('quy-ches')
  saveQuyChe(@Body() dto: any, @Request() req: any) {
    return this.appService.saveQuyChe(dto, req.user);
  }

  @Get(':id')
  getApplicationById(@Param('id') id: string, @Request() req: any) {
    return this.appService.getApplicationById(id, req.user);
  }

  @Post()
  create(@Body() dto: CreateApplicationDto, @Request() req: any) {
    return this.appService.createDraft(req.user.id, dto);
  }

  @Put(':id/submit')
  submitApplication(@Param('id') id: string, @Request() req: any, @Body() body: any) {
    return this.appService.submitApplication(id, req.user.id, body.minh_chung_ids || []);
  }

  @Put(':id/review')
  review(@Param('id') id: string, @Body() dto: ReviewApplicationDto, @Request() req: any) {
    return this.appService.reviewApplication(id, dto, req.user);
  }

  @Post('batch-escalate')
  escalateBatch(@Body('appIds') appIds: string[], @Request() req: any) {
    return this.appService.escalateBatch(appIds, req.user);
  }
}
