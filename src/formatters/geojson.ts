import { Formatter } from "./formatter";

class GeoJSONFormatter extends Formatter {
  format(points: number[][]) {
    return {
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
    };
  }
}

export { GeoJSONFormatter };
