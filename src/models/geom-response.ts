import { z } from 'zod';
import { GeomTypeEnum } from '../enums';
import { Latitude, Longitude, TJSON } from '../types';

export class GeomResponse {
  public coordinates: [Longitude, Latitude];

  public type: GeomTypeEnum;

  public constructor({
    coordinates,
    type,
  }: {
    coordinates: [Longitude, Latitude];
    type: GeomTypeEnum;
  }) {
    this.coordinates = coordinates;
    this.type = type;
  }

  public static constructorValidator() {
    return z.object({
      coordinates: z.tuple([
        z.preprocess((v) => parseFloat(v as string), z.number()),
        z.preprocess((v) => parseFloat(v as string), z.number()),
      ]),
      type: z.nativeEnum(GeomTypeEnum),
    });
  }

  public static fromJSON(json: TJSON): GeomResponse {
    const validJSON = this.constructorValidator().parse(json);
    return new GeomResponse(validJSON);
  }
}
