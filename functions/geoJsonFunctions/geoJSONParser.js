export const parseGeoJsons = async cityName => {
  try {
    const responseBorders = await fetch(`geoJSONs/borders/${cityName}.geojson`);
    const responseHexes = await fetch(`geoJSONs/hexes/${cityName}.geojson`);

    const hexesData = await responseHexes.json();
    const bordersData = await responseBorders.json()

    return {
      hexesData,
      bordersData
    }
  } catch (error) {
    console.error("error parsing of borders and hexes", error)
  }
};

export const processHexes = feature => {
  let featuresToAdd = [];

  for (let key of Object.keys(feature.properties)) {
    if (feature.properties[key] === true) {
      featuresToAdd.push(key);
    }
  }

  return {
    featuresToAdd,
  };
};
