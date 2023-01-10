import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './apiKey.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule],
  providers: [AuthService, ApiKeyStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
