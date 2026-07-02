import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    ApplicationModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
