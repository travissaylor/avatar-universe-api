import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as characters from '../../../prisma/characters.json';

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
}
