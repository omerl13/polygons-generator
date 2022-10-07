import { Formatter } from "./formatter";
import { GeoJSONFormatter } from "./geojson";
import { PathFormatter } from "./path";
import { RawFormatter } from "./raw";
import { WKTFormatter } from "./wkt";

enum PolygonFormat {
  Raw,
  GeoJSON,
  WKT,
  Path,
}

class FormatterMapper {
  static #mapping: Record<PolygonFormat, Formatter> = {
    [PolygonFormat.Raw]: new RawFormatter(),
    [PolygonFormat.GeoJSON]: new GeoJSONFormatter(),
    [PolygonFormat.WKT]: new WKTFormatter(),
    [PolygonFormat.Path]: new PathFormatter(),
  };

  static getFormatter(format: PolygonFormat): Formatter {
    return this.#mapping[format];
  }
}

export { FormatterMapper, PolygonFormat };
