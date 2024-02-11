import { z } from 'zod';
import { TJSON } from '../types';
import { GeomResponse } from './geom-response';

const searchResponseSchema = z.object({
  province: z.string(),
  county: z.string(),
  district: z.string(),
  city: z.string(),
  region: z.string(),
  neighborhood: z.string(),
  title: z.string(),
  address: z.string(),
  type: z.string(),
  fclass: z.string(),
  geom: GeomResponse.constructorValidator().transform(
    (validJSON) => new GeomResponse(validJSON),
  ),
});
export class SearchResponse {
  public province: string;

  public county: string;

  public district: string;

  public city: string;

  public region: string;

  public neighborhood: string;

  public title: string;

  public address: string;

  public type: string;
  // this field can be point or line or polygon

  public fclass: string;

  public geom: GeomResponse;

  public constructor({
    province,
    county,
    district,
    city,
    region,
    neighborhood,
    title,
    address,
    type,
    fclass,
    geom,
  }: {
    province: string;
    county: string;
    district: string;
    city: string;
    region: string;
    neighborhood: string;
    title: string;
    address: string;
    type: string;
    fclass: string;
    geom: GeomResponse;
  }) {
    this.province = province;
    this.county = county;
    this.district = district;
    this.city = city;
    this.region = region;
    this.neighborhood = neighborhood;
    this.title = title;
    this.address = address;
    this.type = type;
    this.fclass = fclass;
    this.geom = geom;
  }

  public static constructorValidator() {
    return searchResponseSchema;
  }

  public static fromJSON(json: TJSON): SearchResponse {
    const validJSON = this.constructorValidator().parse(json);
    return new SearchResponse(validJSON);
  }
}
