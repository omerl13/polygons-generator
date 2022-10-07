import { Formatter } from "./formatter";

class WKTFormatter extends Formatter {
  format(points: number[][]): string {
    return `POLYGON ((${points.map((point) => point.join(" ")).join(",")}))`;
  }
}

export { WKTFormatter };
