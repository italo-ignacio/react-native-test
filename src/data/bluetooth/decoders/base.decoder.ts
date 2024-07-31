export abstract class BaseDecoder {
  protected readonly rawResponse: string;

  public constructor(rawResponse: string) {
    this.rawResponse = rawResponse;
  }

  abstract decode(): string | null | number | boolean;
}
