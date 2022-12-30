import { PrismaClient } from '@prisma/client';
import * as characters from './characters.json';

const prisma = new PrismaClient();

async function main() {
  return await Promise.all(
    characters.map(async (character) => {
      if (!character) {
        return null;
      }
      const char = await prisma.character.create({
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
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
