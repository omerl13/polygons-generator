import { describe, it, expect } from "@jest/globals";
import { RawFormatter } from "../../src/formatters/raw";

describe("RawFormatter", () => {
  it("return raw results", () => {
    const points = [
      [-0.05262582204837067, 51.46361446514383],
      [-0.05545527484885695, 51.46461461501399],
      [-0.05877349695285488, 51.46797260927282],
    ];

    const result = new RawFormatter().format(points);

    expect(result).toEqual(points);
  });
});
