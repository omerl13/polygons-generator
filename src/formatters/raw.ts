import { Formatter } from "./formatter";

class RawFormatter extends Formatter {
  format(points: number[][]): number[][] {
    return points;
  }
}

export { RawFormatter };
