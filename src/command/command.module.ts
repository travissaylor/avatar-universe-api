import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScraperRunner } from './scraper.command';
import { ScraperService } from './scraper.service';

@Module({
  imports: [HttpModule],
  providers: [ScraperRunner, ScraperService],
})
export class CommandModule {}
