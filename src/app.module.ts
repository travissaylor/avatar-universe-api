import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { TvSeriesModule } from './tv-series/tv-series.module';

@Module({
  imports: [CharactersModule, TvSeriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
