import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { DbSeedRunner } from './command';
import { DbSeedService } from './service';

@Module({
  imports: [HttpModule],
  providers: [DbSeedRunner, DbSeedService, PrismaService],
})
export class DbSeedModule {}
