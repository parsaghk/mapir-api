export class MapirApiHeaders {
  private _apiKey: string;

  private _contentType = 'application/json';

  public constructor(apiKey: string) {
    this._apiKey = apiKey;
  }

  public toJSON(): Record<string, string> {
    return {
      'x-api-key': this._apiKey,
      'content-type': this._contentType,
    };
  }
}
