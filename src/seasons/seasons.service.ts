import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SeasonsService {
  constructor(private readonly prisma: PrismaService) {}

  async find(params: {
    take?: number;
    skip?: number;
    orderBy?: Prisma.SeasonOrderByWithRelationInput;
  }) {
    const { take, skip, orderBy } = params;
    return await this.prisma.season.findMany({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: orderBy,
    });
  }

  async findById(id: number) {
    return await this.prisma.season.findFirst({
      where: {
        id,
      },
    });
  }

  async findRandom(count: number) {
    if (count === 0) {
      return [];
    }
    const seasonCount = await this.prisma.season.count();

    if (count > seasonCount) {
      count = seasonCount;
    }

    const nums: Set<number> = new Set();
    while (nums.size !== count) {
      nums.add(Math.floor(Math.random() * seasonCount) + 1);
    }

    return await this.prisma.season.findMany({
      where: {
        id: {
          in: [...nums],
        },
      },
    });
  }
}
