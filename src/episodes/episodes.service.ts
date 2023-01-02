import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EpisodesService {
  constructor(private readonly prisma: PrismaService) {}

  async find(params: {
    take?: number;
    skip?: number;
    orderBy?: Prisma.EpisodeOrderByWithRelationInput;
  }) {
    const { take, skip, orderBy } = params;
    return await this.prisma.episode.findMany({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: orderBy,
    });
  }

  async findById(id: number) {
    return await this.prisma.episode.findFirst({
      where: {
        id,
      },
    });
  }

  async findRandom(count: number) {
    if (count === 0) {
      return [];
    }
    const episodeCount = await this.prisma.episode.count();

    if (count > episodeCount) {
      count = episodeCount;
    }

    const nums: Set<number> = new Set();
    while (nums.size !== count) {
      nums.add(Math.floor(Math.random() * episodeCount) + 1);
    }

    return await this.prisma.episode.findMany({
      where: {
        id: {
          in: [...nums],
        },
      },
    });
  }
}
