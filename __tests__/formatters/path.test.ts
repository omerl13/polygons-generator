import { describe, it, expect } from "@jest/globals";
import { PathFormatter } from "../../src/formatters/path";

describe("PathFormatter", () => {
  it("format points as path", () => {
    const points = [
      [-0.05262582204837067, 51.46361446514383],
      [-0.05545527484885695, 51.46461461501399],
      [-0.05877349695285488, 51.46797260927282],
    ];

    const result = new PathFormatter().format(points);

    expect(result).toEqual(
      "((-0.05262582204837067,51.46361446514383),(-0.05545527484885695,51.46461461501399),(-0.05877349695285488,51.46797260927282))"
    );
  });
});
