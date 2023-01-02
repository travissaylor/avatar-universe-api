import { Command, CommandRunner } from 'nest-commander';
import { DbSeedService } from './service';

@Command({
  name: 'seed-db',
})
export class DbSeedRunner extends CommandRunner {
  constructor(private readonly seedService: DbSeedService) {
    super();
  }
  async run(): Promise<void> {
    const characters = await this.seedService.seedCharacters();
    console.log('Characters Done', characters.length);

    const tvSeries = await this.seedService.seedTvSeriesAndSeasons();
    console.log('Tv Series Done', tvSeries.length);

    const episodes = await this.seedService.seedEpisodes();
    console.log('Episodes Done', episodes.length);

    console.log('DONE');
  }
}
