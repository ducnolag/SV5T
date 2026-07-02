import { Module } from '@nestjs/common';
import { AttendanceModule } from './attendance/attendance.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    AttendanceModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
