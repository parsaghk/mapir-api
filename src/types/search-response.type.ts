export interface TSearchResponse {
  'odata.count': number;
  value: Array<{
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
    geom: {
      type: string;
      coordinates: [number, number];
    };
  }>;
}
