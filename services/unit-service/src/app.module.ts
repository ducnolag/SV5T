import { Module } from '@nestjs/common';
import { UnitModule } from './unit/unit.module';
import { RuleModule } from './rule/rule.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    UnitModule,
    RuleModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
