import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Character } from '@prisma/client';
import { load, CheerioAPI, Element } from 'cheerio';
import * as fs from 'fs/promises';
import * as path from 'path';
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

  async getCharactersFromNames(names: string[]) {
    const PromiseResults = await Promise.allSettled(
      names.map((name) => this.scrapeCharacter(name)),
    );

    return PromiseResults.map((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      }

      return null;
    }).filter((item) => item !== null);
  }

  async persistCharacterData(characterData: Partial<Character>[]) {
    try {
      await fs.writeFile(
        'prisma/characters.json',
        JSON.stringify(characterData, null, 2),
        'utf8',
      );
    } catch (e) {
      console.log(e);
    }
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

  private async scrapeCharacter(name: string) {
    const characterReqRes = await this.http.axiosRef.get(
      `https://avatar.fandom.com/wiki/${name}`,
    );

    const $ = load(characterReqRes.data);
    const labels = $('.pi-data-label');
    const values = $('.pi-data-value');
    const photoInfo = $('.pi-image-thumbnail');

    const parsedLabels = labels
      .map((_, element) => {
        return $(element).text();
      })
      .toArray();

    const parsedValues = values
      .map((_, element) => {
        if ($(element).html().includes('<li>')) {
          return this.extractListItemValues($, element);
        }
        return $(element).text();
      })
      .toArray();

    const parsedPhotoSrc = photoInfo.attr('src');

    const character: Partial<Character> = {
      photoUrl: parsedPhotoSrc,
      name,
    };

    parsedLabels.forEach((label, i) => {
      character[label.split(' ')[0].toLowerCase()] = parsedValues[i];
    });

    if (character.first) {
      character.first = character.first.replace(/"/g, '');
    }

    if (character.last) {
      character.last = character.last.replace(/"/g, '');
    }

    return character;
  }

  private extractListItemValues($: CheerioAPI, element: Element) {
    const list = element.firstChild as Element;
    const values = list.children.map((li) => {
      return $(li).text();
    });
    return values.join(', ');
  }
}
