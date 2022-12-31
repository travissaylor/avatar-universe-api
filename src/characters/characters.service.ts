import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CharactersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

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

  async findById(id: number) {
    return await this.prisma.character.findFirst({
      where: {
        id,
      },
    });
  }
}
