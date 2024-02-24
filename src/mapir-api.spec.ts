import * as dotenv from 'dotenv';
import { beforeAll, describe, expect, test } from 'vitest';
import { z } from 'zod';
import { MapirApi } from './mapir-api';
import { ReverseResponse, SearchRequest, SearchResponse } from './models';

dotenv.config();

const envVariables = z
  .object({
    MAPIR_API_KEY: z.string(),
  })
  .parse(process.env);

describe('MapIR Api Module', () => {
  let mapirApi: MapirApi;
  beforeAll(() => {
    mapirApi = new MapirApi({
      apiKey: envVariables.MAPIR_API_KEY,
    });
  });

  test('Reverse api', async () => {
    const latitude = 35.71619;
    const longitude = 51.36247;
    const res = await mapirApi.reverse({
      latitude,
      longitude,
    });
    expect(res).toBeInstanceOf(ReverseResponse);
  });

  test('Fast reverse api', async () => {
    const latitude = 35.72379;
    const longitude = 51.33417;
    const res = await mapirApi.fastReverse({
      latitude,
      longitude,
    });
    expect(res).toBeInstanceOf(ReverseResponse);
  });

  test('Search api', async () => {
    const searchResponseList = await mapirApi.search(
      new SearchRequest({ text: 'صادقیه' }),
    );
    expect(searchResponseList[0]).toBeInstanceOf(SearchResponse);
  });

  test('Autocomplete Search api', async () => {
    const autoCompleteSearchResponseList = await mapirApi.autoCompleteSearch(
      new SearchRequest({ text: 'صادقیه' }),
    );
    expect(autoCompleteSearchResponseList[0]).toBeInstanceOf(SearchResponse);
  });
});
