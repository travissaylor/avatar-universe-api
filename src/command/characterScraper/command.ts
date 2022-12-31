import { Command, CommandRunner } from 'nest-commander';
import { CharacterScraperService } from './service';

@Command({
  name: 'scrape-character-data',
})
export class CharacterScraperRunner extends CommandRunner {
  constructor(private readonly scraperService: CharacterScraperService) {
    super();
  }
  async run(): Promise<void> {
    const names = await this.scraperService.getNames();
    console.log('Names Finished', names.length);
    const characterData = await this.scraperService.getCharactersFromNames(
      names,
    );
    console.log('Characters Finished', characterData.length);
    this.scraperService.persistCharacterData(characterData);
    console.log('DONE');
  }
}
