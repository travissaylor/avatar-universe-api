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
    this.seedService.seedCharacters();
    console.log('DONE');
  }
}
