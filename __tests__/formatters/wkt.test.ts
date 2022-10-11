import { describe, it, expect } from "@jest/globals";
import { WKTFormatter } from "../../src/formatters/wkt";

describe("WKTFormatter", () => {
  it("format points to wkt", () => {
    const points = [
      [-0.05262582204837067, 51.46361446514383],
      [-0.05545527484885695, 51.46461461501399],
      [-0.05877349695285488, 51.46797260927282],
    ];

    const result = new WKTFormatter().format(points);

    expect(result).toEqual(
      "POLYGON ((-0.05262582204837067 51.46361446514383,-0.05545527484885695 51.46461461501399,-0.05877349695285488 51.46797260927282))"
    );
  });
});
