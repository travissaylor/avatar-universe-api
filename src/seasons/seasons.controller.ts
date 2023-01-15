import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseOptionalIntPipe } from 'src/util/parseOptionalInt.pipe';
import { SeasonsService } from './seasons.service';

@ApiTags('seasons')
@Controller({ path: 'seasons', version: '1' })
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get()
  async find(
    @Query('take', ParseOptionalIntPipe) take = 10,
    @Query('skip', ParseOptionalIntPipe) skip?: number,
    @Query('orderBy') orderBy: 'asc' | 'desc' = 'asc',
  ) {
    return await this.seasonsService.find({
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
    return await this.seasonsService.findRandom(count);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.seasonsService.findById(id);
  }
}
