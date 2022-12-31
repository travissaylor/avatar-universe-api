import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CharacterScraperRunner } from './command';
import { CharacterScraperService } from './service';

@Module({
  imports: [HttpModule],
  providers: [CharacterScraperRunner, CharacterScraperService],
})
export class CharacterScraperModule {}
