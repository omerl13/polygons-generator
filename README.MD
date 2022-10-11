# Polygons Generator

### Options

| Name            | Description                                      | Values                                                                                      | default value     |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------- | ----------------- |
| format          | Results format                                   | PolygonFormat.Raw <br> PolygonFormat.GeoJSON <br> PolygonFormat.WKT <br> PolygonFormat.Path | PolygonFormat.Raw |
| customFormatter | Custom formatter to apply on the results         | (points: number[][]) => unknown                                                             | undefined         |
| randomize       | Whether to randomize the polygon vertices or not | true / false                                                                                | true              |

### Example:

```ts
import { PolygonGenerator, PolygonFormat } from "polygons-generator";

const polygonGenerator = new PolygonGenerator({
  format: PolygonFormat.GeoJSON,
});

const lat = 51.46298;
const lon = -0.05939;
const radiusKm = 1;
const numberOfPoints = 5;
const res = polygonGenerator.generate(lat, lon, radiusKm, numberOfPoints);
console.log(JSON.stringify(res, null, 2));
```

results:
<img width="1536" alt="image" src="https://user-images.githubusercontent.com/26675529/194408590-7bdc5a91-42da-44e1-bbae-f394398d8bd8.png">

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-0.05262582204837067, 51.46361446514383],
            [-0.05545527484885695, 51.46461461501399],
            [-0.05877349695285488, 51.46797260927282],
            [-0.05940549309865073, 51.4667380406854],
            [-0.06409748585040818, 51.46627080805481],
            [-0.0652177966687324, 51.46276466165517],
            [-0.0630963845499686, 51.46269332060158],
            [-0.0599052372618077, 51.45797059453484],
            [-0.05788872733709241, 51.45911203447885],
            [-0.05491537823336, 51.46082030439293],
            [-0.05262582204837067, 51.46361446514383]
          ]
        ]
      }
    }
  ]
}
```
