import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { TvSeriesModule } from './tv-series/tv-series.module';
import { SeasonsModule } from './seasons/seasons.module';
import { EpisodesModule } from './episodes/episodes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CharactersModule,
    TvSeriesModule,
    SeasonsModule,
    EpisodesModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
