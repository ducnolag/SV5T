import { Module } from '@nestjs/common';
import { ProofModule } from './proof/proof.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    ProofModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
