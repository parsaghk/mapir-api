import { z } from 'zod';
import { SearchFilterOptionsEnum, SearchSelectOptionsEnum } from '../enums';
import { latitudeSchema, longitudeSchema } from '../schema';

const searchRequestSchema = z.object({
  text: z.string(),
  $select: z.nativeEnum(SearchSelectOptionsEnum).optional(),
  $filter: z.nativeEnum(SearchFilterOptionsEnum).optional(),
  lat: latitudeSchema.optional(),
  lon: longitudeSchema.optional(),
});

export class SearchRequest {
  public text: string;

  public $select?: SearchSelectOptionsEnum;

  public $filter?: SearchFilterOptionsEnum;

  public lat?: number;

  public lon?: number;

  public constructor({
    text,
    $select,
    $filter,
    lat,
    lon,
  }: {
    text: string;
    $select?: SearchSelectOptionsEnum;
    $filter?: SearchFilterOptionsEnum;
    lat?: number;
    lon?: number;
  }) {
    this.text = text;
    this.$select = $select;
    this.$filter = $filter;
    this.lat = lat;
    this.lon = lon;
    SearchRequest.constructorValidator().parse(this);
  }

  public static constructorValidator() {
    return searchRequestSchema;
  }
}
