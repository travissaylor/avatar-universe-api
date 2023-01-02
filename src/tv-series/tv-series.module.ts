import { Logger, Module } from '@nestjs/common';
import { TvSeriesService } from './tv-series.service';
import { TvSeriesController } from './tv-series.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TvSeriesController],
  providers: [TvSeriesService, PrismaService, Logger],
})
export class TvSeriesModule {}
