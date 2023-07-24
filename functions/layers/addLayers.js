import {ArcLayer, GeoJsonLayer, HeatmapLayer} from "deck.gl";

// const addLayers = (stateOfToggles) => {
//     const stateLayers = [];
//
//     const mapLayers = [
//         {
//             layerName: "promZones",
//             layer: new GeoJsonLayer({
//                 id: 'airports',
//                 data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-segments.json",
//                 // Styles
//                 filled: true,
//                 pointRadiusMinPixels: 2,
//                 pointRadiusScale: 2000,
//                 getPointRadius: f => 11 - f.properties.scalerank,
//                 getFillColor: [200, 0, 80, 180],
//                 // Interactive props
//                 pickable: true,
//                 autoHighlight: true
//             })
//         },
//         {
//             layerName: "livingZones",
//             layer: new HeatmapLayer({
//                 data: "HELLO",
//                 id: 'heatmap-layer',
//                 pickable: false,
//                 getPosition: d => [d[0], d[1]],
//                 getWeight: d => d[2],
//                 radiusPixels: 30,
//                 intensity: 1,
//                 threshold: 0.03
//             })
//         },
//         {
//             layerName: "greenZones",
//             layer: new ArcLayer({
//                 id: 'arcs',
//                 data: "GELLLO",
//                 dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
//                 // Styles
//                 getSourcePosition: f => [-0.4531566, 51.4709959], // London
//                 getTargetPosition: f => f.geometry.coordinates,
//                 getSourceColor: [0, 128, 200],
//                 getTargetColor: [200, 0, 80],
//                 getWidth: 1
//             })
//         }
//     ];
//
//     for (let key of Object.keys(stateOfToggles)) {
//         if (stateOfToggles[key]) {
//             stateLayers.push(key)
//         }
//     }
//     console.log(stateLayers)
//
//     return mapLayers.filter((layerItem) => stateLayers.includes(layerItem["layerName"]))
// };


export default addLayers