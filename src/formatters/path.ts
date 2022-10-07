import { Formatter } from "./formatter";

class PathFormatter extends Formatter {
  format(points: number[][]): string {
    return `((${points.map((point) => point.join(",")).join("),(")}))`;
  }
}

export { PathFormatter };
