import { Command, CommandRunner } from 'nest-commander';
import { ScraperService } from './scraper.service';

@Command({
  name: 'scrape-seed-data',
})
export class ScraperRunner extends CommandRunner {
  constructor(private readonly scraperService: ScraperService) {
    super();
  }
  async run(): Promise<void> {
    const names = await this.scraperService.getNames();
    const characterData = await this.scraperService.getCharactersFromNames(
      names,
    );
    console.log(characterData);
  }
}
