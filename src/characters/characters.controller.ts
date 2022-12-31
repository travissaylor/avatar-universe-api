import { Controller, Get, Param, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('character')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async find(
    @Query('take') take = 10,
    @Query('skip') skip?: number,
    @Query('orderBy') orderBy: 'asc' | 'desc' = 'asc',
  ) {
    return this.charactersService.find({
      take,
      skip,
      orderBy: { id: orderBy },
    });
  }

  @Get('/avatar')
  async findAvatars(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('orderBy') orderBy: 'asc' | 'desc' = 'asc',
  ) {
    return this.charactersService.findAvatars({
      take,
      skip,
      orderBy: { id: orderBy },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findById(+id);
  }
}
