import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as characters from '../../../prisma/characters.json';
import * as episodeSeasonGrouping from '../../../prisma/episodes.json';
import { seasonData, tvSeriesData } from './entity';
import { Episode, Prisma } from '@prisma/client';

@Injectable()
export class DbSeedService {
  constructor(private readonly prisma: PrismaService) {}

  async seedCharacters() {
    return await Promise.all(
      characters.map(async (character) => {
        if (!character) {
          return null;
        }
        const char = await this.prisma.character.create({
          data: {
            photoUrl: character.photoUrl ?? undefined,
            name: character.name,
            gender: character.gender,
            eye: character.eye,
            hair: character.hair,
            skin: character.skin,
            love: character.love,
            weapon: character.weapon,
            profession: character.profession,
            position: character.position,
            predecessor: character.predecessor,
            affiliation: character.affiliation,
            first: character.first,
            voiced: character.voiced,
            nationality: character.nationality,
            ethnicity: character.ethnicity,
          },
        });
        console.log(char.id);
        return char;
      }),
    );
  }

  async seedTvSeriesAndSeasons() {
    return await Promise.all(
      tvSeriesData.map((series) => {
        return this.prisma.tvSeries.create({ data: series });
      }),
    );
  }

  async seedEpisodes() {
    const episodes: Prisma.EpisodeCreateInput[] = [];

    episodeSeasonGrouping.forEach((season, seasonIndex) => {
      season.forEach((episode) => {
        episodes.push({
          ...episode,
          season: {
            connect: { order: seasonIndex + 1 },
          },
          series: {
            connect: { order: 1 },
          },
        });
      });
    });

    return await Promise.all(
      episodes.map(async (episode) => {
        return await this.prisma.episode.create({
          data: episode,
        });
      }),
    );
  }
}
