import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseOptionalIntPipe } from 'src/util/parseOptionalInt.pipe';
import { EpisodesService } from './episodes.service';

@ApiTags('episodes')
@Controller({ path: 'episodes', version: '1' })
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  async find(
    @Query('take', ParseOptionalIntPipe) take = 10,
    @Query('skip', ParseOptionalIntPipe) skip?: number,
    @Query('orderBy') orderBy: 'asc' | 'desc' = 'asc',
  ) {
    return await this.episodesService.find({
      take,
      skip,
      orderBy: { id: orderBy },
    });
  }

  @Get('/random')
  async findRandom(
    @Query('count', ParseOptionalIntPipe)
    count = 1,
  ) {
    return await this.episodesService.findRandom(count);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.episodesService.findById(id);
  }
}
