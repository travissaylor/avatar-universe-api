import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [CharactersController],
  providers: [CharactersService, PrismaService, Logger],
})
export class CharactersModule {}
