import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ParseOptionalIntPipe } from 'src/util/parseOptionalInt.pipe';
import { TvSeriesService } from './tv-series.service';

@Controller('tv-series')
export class TvSeriesController {
  constructor(private readonly tvSeriesService: TvSeriesService) {}

  @Get()
  async find(
    @Query('take', ParseOptionalIntPipe) take = 10,
    @Query('skip', ParseOptionalIntPipe) skip?: number,
    @Query('orderBy') orderBy: 'asc' | 'desc' = 'asc',
  ) {
    return await this.tvSeriesService.find({
      take,
      skip,
      orderBy: { order: orderBy },
    });
  }

  @Get('/random')
  async findRandom(
    @Query('count', ParseOptionalIntPipe)
    count = 1,
  ) {
    return await this.tvSeriesService.findRandom(count);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.tvSeriesService.findById(id);
  }
}