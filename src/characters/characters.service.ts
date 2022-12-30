import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharactersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}
  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  async find(params: {
    take?: number;
    skip?: number;
    orderBy?: Prisma.CharacterOrderByWithRelationInput;
  }) {
    const { take, skip, orderBy } = params;
    return await this.prisma.character.findMany({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: orderBy,
    });
  }

  async findAvatars(params: {
    take?: number;
    skip?: number;
    orderBy?: Prisma.CharacterOrderByWithRelationInput;
  }) {
    const { take, skip, orderBy } = params;
    return await this.prisma.character.findMany({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: orderBy,
      where: {
        profession: {
          startsWith: 'Avatar',
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
