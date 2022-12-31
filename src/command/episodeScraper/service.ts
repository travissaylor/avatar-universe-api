import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { load, CheerioAPI, Element } from 'cheerio';
import * as fs from 'fs/promises';
import { Episode } from './entity';

@Injectable()
export class EpisodeScraperService {
  constructor(private readonly http: HttpService) {}

  async getTheLastAirbenderEpisodeData() {
    const episodeReqRes = await this.http.axiosRef.get(
      `https://avatar.fandom.com/wiki/List_of_Avatar:_The_Last_Airbender_episodes`,
    );

    const $ = load(episodeReqRes.data);
    const tables = $('.wikitable').toArray();
    return tables.map((table) => {
      return this.getEpisodesFromTable($, table);
    });
  }

  private getEpisodesFromTable($: CheerioAPI, table: Element): Episode[] {
    const rows = $('tr', table).toArray();
    rows.shift();

    const dataTuple = this.chunk(rows, 2);

    return dataTuple.map(([dataItemsRow, descriptioRow]) => {
      return {
        ...this.getDataFromRow($, dataItemsRow),
        description: $(descriptioRow).text().replace(/\n/g, ''),
      };
    });
  }

  private getDataFromRow($: CheerioAPI, tr: Element) {
    const tds = $('td', tr);
    return {
      title: $(tds[0]).text().replace(/\n/g, '').replace(/"/g, ''),
      airDate: $(tds[1]).text().replace(/\n/g, ''),
      seasonEpisode: parseInt($(tds[2]).text()),
      seriesEpisode: parseInt($(tds[3]).text()),
    };
  }

  private chunk(array: Element[], chunk: number) {
    const result: Element[][] = [];
    for (let i = 0; i < array.length; i += chunk) {
      result.push(array.slice(i, i + chunk));
    }
    return result;
  }
}
