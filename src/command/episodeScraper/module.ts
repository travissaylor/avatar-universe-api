import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EpisodeScraperRunner } from './command';
import { EpisodeScraperService } from './service';

@Module({
  imports: [HttpModule],
  providers: [EpisodeScraperRunner, EpisodeScraperService],
})
export class EpisodeScraperModule {}
