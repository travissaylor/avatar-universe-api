import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { load, CheerioAPI, Element } from 'cheerio';
import * as fs from 'fs/promises';

@Injectable()
export class EpisodeScraperService {
  constructor(private readonly http: HttpService) {}
}
