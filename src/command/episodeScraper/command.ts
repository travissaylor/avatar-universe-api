import { Command, CommandRunner } from 'nest-commander';
import { EpisodeScraperService } from './service';

@Command({
  name: 'scrape-episode-data',
})
export class EpisodeScraperRunner extends CommandRunner {
  constructor(private readonly scraperService: EpisodeScraperService) {
    super();
  }
  async run(): Promise<void> {
    const theLastAirbenderEpisodes =
      await this.scraperService.getTheLastAirbenderEpisodeData();

    await this.scraperService.persistEpisodeData(theLastAirbenderEpisodes);
    console.log('DONE');
  }
}
