export abstract class BaseDecoder {
  protected readonly rawResponse: string;

  protected constructor(rawResponse) {
    this.rawResponse = rawResponse;
  }

  abstract decode();
}
