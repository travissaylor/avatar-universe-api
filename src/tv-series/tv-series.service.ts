import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TvSeriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async find(params: {
    take?: number;
    skip?: number;
    orderBy?: Prisma.TvSeriesOrderByWithRelationInput;
  }) {
    const { take, skip, orderBy } = params;
    return await this.prisma.tvSeries.findMany({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: orderBy,
    });
  }

  async findById(id: number) {
    return await this.prisma.tvSeries.findFirst({
      where: {
        id,
      },
    });
  }

  async findRandom(count: number) {
    if (count === 0) {
      return [];
    }
    const seriesCount = await this.prisma.tvSeries.count();

    if (count > seriesCount) {
      count = seriesCount;
    }

    const nums: Set<number> = new Set();
    while (nums.size !== count) {
      nums.add(Math.floor(Math.random() * seriesCount) + 1);
    }

    return await this.prisma.tvSeries.findMany({
      where: {
        id: {
          in: [...nums],
        },
      },
    });
  }
}
