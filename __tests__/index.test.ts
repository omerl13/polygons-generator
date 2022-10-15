import { describe, it, expect } from "@jest/globals";
import { PolygonGenerator, PolygonFormat } from "../src";

describe("PolygonGenerator", () => {
  const lat = -0.1;
  const lon = 51.09;

  it("Returns a closed polygon", () => {
    const result = new PolygonGenerator({ format: PolygonFormat.Raw }).generate(lat, lon, 1, 6) as number[][];

    expect(result[0]).toEqual(result[6]);
  });

  it("Returns the same results in each run if randomized is false", () => {
    const generator = new PolygonGenerator({ format: PolygonFormat.Raw, randomize: false });
    const result1 = generator.generate(lat, lon, 1, 6);
    const result2 = generator.generate(lat, lon, 1, 6);

    expect(result1).toEqual(result2);
  });

  it("Returns different results in some runs if randomized is true", () => {
    const generator = new PolygonGenerator({ format: PolygonFormat.Raw, randomize: true });
    const result1 = generator.generate(lat, lon, 1, 30);
    const result2 = generator.generate(lat, lon, 1, 30);

    expect(result1).not.toEqual(result2);
  });

  it("Formats the results according to customeFormatter if provided", () => {
    const customFormatter = (_: number[][]) => 'results';
    const generator = new PolygonGenerator({ customFormatter });
    const result = generator.generate(lat, lon, 1, 5);

    expect(result).toEqual('results');
  });
});
