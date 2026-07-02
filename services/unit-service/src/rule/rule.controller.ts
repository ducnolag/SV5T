import { Controller, Get, Post, Body, Put, Param, UseGuards, Request } from '@nestjs/common';
import { RuleService } from './rule.service';
import { CreateRuleDto, UpdateTimeWindowDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('rules')
@UseGuards(AuthGuard('jwt'))
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get()
  getAll() {
    return this.ruleService.getAllRules();
  }

  @Post()
  create(@Body() dto: CreateRuleDto, @Request() req: any) {
    return this.ruleService.createRule(dto, req.user);
  }

  @Put(':id/time-window')
  updateTimeWindow(@Param('id') id: string, @Body() dto: UpdateTimeWindowDto, @Request() req: any) {
    return this.ruleService.updateTimeWindow(id, dto, req.user);
  }
}
