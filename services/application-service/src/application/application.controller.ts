import { Controller, Post, Put, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto, ReviewApplicationDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly appService: ApplicationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  getMyApplications(@Request() req: any) {
    return this.appService.getMyApplications(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('pending')
  getPendingApplications(@Request() req: any) {
    return this.appService.getPendingApplications(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('quy-ches')
  getQuyChes(@Request() req: any) {
    return this.appService.getQuyChes(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('quy-ches')
  saveQuyChe(@Body() dto: any, @Request() req: any) {
    return this.appService.saveQuyChe(dto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getApplicationById(@Param('id') id: string, @Request() req: any) {
    return this.appService.getApplicationById(id, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateApplicationDto, @Request() req: any) {
    return this.appService.createDraft(req.user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/submit')
  submitApplication(@Param('id') id: string, @Request() req: any, @Body() body: any) {
    return this.appService.submitApplication(id, req.user.id, body.minh_chung_ids || []);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/review')
  review(@Param('id') id: string, @Body() dto: ReviewApplicationDto, @Request() req: any) {
    return this.appService.reviewApplication(id, dto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('batch-escalate')
  escalateBatch(@Body('appIds') appIds: string[], @Request() req: any) {
    return this.appService.escalateBatch(appIds, req.user);
  }
}
