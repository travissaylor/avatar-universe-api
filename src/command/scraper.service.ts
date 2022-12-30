import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { load } from 'cheerio';
// import pretty from 'pretty';

@Injectable()
export class ScraperService {
  constructor(private readonly http: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getNames() {
    const [chunk1, chunk2, chunk3] = await Promise.all([
      this.scrapeNameChunk(),
      this.scrapeNameChunk('Jingbo'),
      this.scrapeNameChunk('Shiro+Shinobi'),
    ]);

    return [...chunk1, ...chunk2, ...chunk3];
  }

  private async scrapeNameChunk(query = '') {
    const nameReqRes = await this.http.axiosRef.get(
      `https://avatar.fandom.com/wiki/Category:Characters?from=${query}`,
    );

    const $ = load(nameReqRes.data);
    const characterLinks = $('.category-page__member-link');
    return characterLinks
      .map((_, element) => {
        return $(element).text();
      })
      .toArray()
      .filter((name) => !name.includes('Category:'));
  }
}
