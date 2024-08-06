export abstract class BaseDecoder {
  protected readonly rawResponse: string;

  public constructor(rawResponse: string) {
    this.rawResponse = rawResponse;
  }

  abstract decode():
    | string
    | null
    | number
    | boolean
    | {
        sensorA: number | null;
        sensorB: number | null;
      }
    | {
        idle: number;
        point1: number;
        point2: number;
        point3: number;
        point4: number;
      };
}
