import { FormatterMapper, PolygonFormat } from "./formatters/mapper";

const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;
const R_EARTH_KM = 6371;

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
    const latRad = lat * DEG_TO_RAD;
    const lonRad = lon * DEG_TO_RAD;
    const radiusToEarth = radius / R_EARTH_KM;
    const sinRadius = Math.sin(radiusToEarth);
    const cosRadius = Math.cos(radiusToEarth);
    const sinLat = Math.sin(latRad);
    const cosLat = Math.cos(latRad);

    const transform = this.#randomize
      ? this.#tunedRandomize(radius, pointsNum)
      : (x: number) => x;

    const points = [];

    for (let i = 0; i < pointsNum; i++) {
      const bearing = DEG_TO_RAD + (2 * Math.PI * -i) / pointsNum;
      const newLat = Math.asin(sinLat * cosRadius + cosLat * sinRadius * Math.cos(bearing));
      const newLon = lonRad + Math.atan2(Math.sin(bearing) * sinRadius * cosLat, cosRadius - sinLat * Math.sin(newLat));
      points.push([transform(newLon * RAD_TO_DEG), transform(newLat * RAD_TO_DEG)]);
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
