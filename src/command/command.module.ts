import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CharacterScraperModule } from './characterScraper/module';
import { DbSeedModule } from './dbSeed/module';
import { EpisodeScraperModule } from './episodeScraper/module';

@Module({
  imports: [
    HttpModule,
    CharacterScraperModule,
    EpisodeScraperModule,
    DbSeedModule,
  ],
})
export class CommandModule {}
