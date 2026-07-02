import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  getAll() {
    return this.unitService.getAllUnits();
  }

  @Get('tree')
  getTree() {
    return this.unitService.getTree();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateUnitDto, @Request() req: any) {
    return this.unitService.createUnit(dto, req.user);
  }
}
