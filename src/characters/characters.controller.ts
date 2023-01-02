import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ParseOptionalIntPipe } from 'src/util/parseOptionalInt.pipe';
import { CharactersService } from './characters.service';

@Controller({ path: 'characters', version: '1' })
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async find(
    @Query('take', ParseOptionalIntPipe) take = 10,
    @Query('skip', ParseOptionalIntPipe) skip?: number,
    @Query('orderBy') orderBy: 'asc' | 'desc' = 'asc',
  ) {
    return await this.charactersService.find({
      take,
      skip,
      orderBy: { id: orderBy },
    });
  }

  @Get('/avatar')
  async findAvatars(
    @Query('take', ParseOptionalIntPipe) take?: number,
    @Query('skip', ParseOptionalIntPipe) skip?: number,
    @Query('orderBy') orderBy: 'asc' | 'desc' = 'asc',
  ) {
    return await this.charactersService.findAvatars({
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
    return await this.charactersService.findRandom(count);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.charactersService.findById(id);
  }
}
