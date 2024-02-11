import { z } from 'zod';
import { latitudeSchema, longitudeSchema } from '../schema';

const ReverseRequestSchema = z.object({
  latitude: latitudeSchema,
  longitude: longitudeSchema,
});

export class ReverseRequest {
  public latitude: number;

  public longitude: number;

  public constructor({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) {
    this.latitude = latitude;
    this.longitude = longitude;
    ReverseRequest.constructorValidator().parse(this);
  }

  public static constructorValidator() {
    return ReverseRequestSchema;
  }
}
