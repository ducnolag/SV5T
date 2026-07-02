import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    ActivityModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
