import { describe, it, expect } from "@jest/globals";
import { GeoJSONFormatter } from "../../src/formatters/geojson";

describe("GeoJSONFormatter", () => {
  it("format points to geojson", () => {
    const points = [
      [-0.05262582204837067, 51.46361446514383],
      [-0.05545527484885695, 51.46461461501399],
      [-0.05877349695285488, 51.46797260927282],
    ];

    const result = new GeoJSONFormatter().format(points);

    expect(result).toEqual({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [points],
          },
        },
      ],
    });
  });
});
