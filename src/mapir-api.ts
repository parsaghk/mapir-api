import Axios, { AxiosHeaders, AxiosInstance, AxiosResponse } from 'axios';
import {
  MapirApiHeaders,
  ReverseRequest,
  ReverseResponse,
  SearchRequest,
  SearchResponse,
} from './models';
import { TJSON, TSearchResponse } from './types';

export class MapirApi {
  private _axios: AxiosInstance;

  private _headers: MapirApiHeaders;

  public constructor({
    apiKey,
    baseURL = 'https://map.ir',
  }: {
    apiKey: string;
    baseURL?: string;
  }) {
    this._headers = new MapirApiHeaders(apiKey);
    this._axios = Axios.create({
      baseURL,
      // transformResponse: (response: AxiosResponse<unknown>) => response.data,
      headers: new AxiosHeaders({
        'x-api-key': apiKey,
        'content-type': 'application/json',
      }),
    });
  }

  public search(inputs: SearchRequest): Promise<Array<SearchResponse>> {
    return this._axios
      .post<
        TSearchResponse,
        AxiosResponse<TSearchResponse>,
        SearchRequest
      >('/search/v2', inputs)
      .then((response: AxiosResponse<TSearchResponse>) => {
        return response.data.value.map((item: TJSON) =>
          SearchResponse.fromJSON(item),
        );
      });
  }

  public autoCompleteSearch(
    inputs: SearchRequest,
  ): Promise<Array<SearchResponse>> {
    return this._axios
      .post<
        TSearchResponse,
        AxiosResponse<TSearchResponse>,
        SearchRequest
      >('/search/v2/autocomplete', inputs)
      .then((response) =>
        response.data.value.map((item: TJSON) => SearchResponse.fromJSON(item)),
      );
  }

  public fastReverse(inputs: ReverseRequest): Promise<ReverseResponse> {
    return this._axios
      .get<TJSON, AxiosResponse<TJSON>>(`/fast-reverse`, {
        params: {
          lat: inputs.latitude,
          lon: inputs.longitude,
        },
      })
      .then((response: AxiosResponse<TJSON>) =>
        ReverseResponse.fromJSON(response.data),
      );
  }

  public reverse(inputs: ReverseRequest): Promise<ReverseResponse> {
    return this._axios
      .get<TJSON, AxiosResponse<TJSON>>(`/reverse`, {
        params: {
          lat: inputs.latitude,
          lon: inputs.longitude,
        },
      })
      .then((response: AxiosResponse<TJSON>) =>
        ReverseResponse.fromJSON(response.data),
      );
  }
}
