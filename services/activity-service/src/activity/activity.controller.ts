import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto, ApproveActivityDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('activities')
@UseGuards(AuthGuard('jwt'))
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  getAll() {
    return this.activityService.getAllActivities();
  }

  @Post()
  create(@Body() dto: CreateActivityDto, @Request() req: any) {
    return this.activityService.createActivity(dto, req.user);
  }

  @Put(':id/approve')
  approve(@Param('id') id: string, @Body() dto: ApproveActivityDto, @Request() req: any) {
    return this.activityService.approveActivity(id, dto, req.user);
  }
}
