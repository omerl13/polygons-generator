import { FormatterMapper, PolygonFormat } from "./formatters/mapper";

const RAD_TO_DEG = 180 / Math.PI;
const R_EARTH_KM = 6371;
const MAX_POINTS = 360;

type Options = {
  format?: PolygonFormat;
  randomize?: boolean;
  customFormatter?: (points: number[][]) => unknown;
};

class PolygonGenerator {
  #format: PolygonFormat;
  #randomize: boolean;
  #customFormatter: Options["customFormatter"];

  constructor({ format, customFormatter, randomize }: Options) {
    this.#format = format ?? PolygonFormat.Raw;
    this.#randomize = randomize ?? true;
    this.#customFormatter = customFormatter;
  }

  generate(lat: number, lon: number, radius: number, pointsNum = 10): unknown {
    const cLat = (radius / R_EARTH_KM) * RAD_TO_DEG;
    const cLng = cLat * Math.cos(lat / RAD_TO_DEG);
    const latCorrection = 1 - Math.abs(lat / 90);
    const transform = this.#randomize
      ? this.#tunedRandomize(radius, pointsNum)
      : (x: number) => x;

    const points = [];

    for (let i = 0; i < MAX_POINTS; i += MAX_POINTS / pointsNum) {
      const theta = Math.PI * (i / (MAX_POINTS / 2));

      const circleX = lon + cLng * Math.cos(theta);
      const circleY = lat + latCorrection * cLat * Math.sin(theta);
      points.push([transform(circleX), transform(circleY)]);
    }
    points.push(points[0]);
    return this.#formatResults(points);
  }

  #formatResults(results: number[][]): unknown {
    if (this.#customFormatter) {
      return this.#customFormatter(results);
    }

    return FormatterMapper.getFormatter(this.#format).format(results);
  }

  #tunedRandomize(radius: number, pointsNum: number): (x: number) => number {
    const tuneBy = radius / (50 * pointsNum);
    return (x: number) => {
      return x + this.#randomBetween(-tuneBy, tuneBy);
    };
  }

  #randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}

export { PolygonGenerator, PolygonFormat };
