function createRGBAGradient(startColor, endColor, steps) {
  const deltaR = (endColor[0] - startColor[0]) / steps;
  const deltaG = (endColor[1] - startColor[1]) / steps;
  const deltaB = (endColor[2] - startColor[2]) / steps;

  const gradientColors = [];

  for (let step = 0; step <= steps; step++) {
    const R = startColor[0] + deltaR * step;
    const G = startColor[1] + deltaG * step;
    const B = startColor[2] + deltaB * step;
    const A = startColor[3];
    gradientColors.push([R, G, B, A]);
  }

  return gradientColors;
}

function createThreeColorGradient(startColor, middleColor, endColor, steps) {
  const stepsPerSegment = steps / 2;

  const deltaR1 = (middleColor[0] - startColor[0]) / stepsPerSegment;
  const deltaG1 = (middleColor[1] - startColor[1]) / stepsPerSegment;
  const deltaB1 = (middleColor[2] - startColor[2]) / stepsPerSegment;

  const deltaR2 = (endColor[0] - middleColor[0]) / stepsPerSegment;
  const deltaG2 = (endColor[1] - middleColor[1]) / stepsPerSegment;
  const deltaB2 = (endColor[2] - middleColor[2]) / stepsPerSegment;

  const gradientColors = [];

  for (let step = 0; step <= stepsPerSegment; step++) {
    const R = startColor[0] + deltaR1 * step;
    const G = startColor[1] + deltaG1 * step;
    const B = startColor[2] + deltaB1 * step;
    const A = startColor[3]
    gradientColors.push([R, G, B, A]);
  }

  for (let step = 0; step <= stepsPerSegment; step++) {
    const R = middleColor[0] + deltaR2 * step;
    const G = middleColor[1] + deltaG2 * step;
    const B = middleColor[2] + deltaB2 * step;
    const A = middleColor[3]
    gradientColors.push([R, G, B, A]);
  }

  return gradientColors;
}

// Example usage:

export const getDifferentHexes = async cityName => {
  const getHexes = await fetch(`/geoJSONs/hexes/${cityName}.geojson`);
  const responseHexes = await getHexes.json();

  const features = responseHexes.features;

  const educationFeatures = JSON.parse(JSON.stringify(features));
  const tourismFeatures = JSON.parse(JSON.stringify(features));
  const zdravFeatures = JSON.parse(JSON.stringify(features));
  const ETFeatures = JSON.parse(JSON.stringify(features)); //education and tourism toggles
  const EZFeatures = JSON.parse(JSON.stringify(features)); //education and zdrav toggles
  const ZTFeatures = JSON.parse(JSON.stringify(features)); //zdrav and tourism toggles
  const ZTEFeatures = JSON.parse(JSON.stringify(features)); //zdrav and tourism and education toggles

  const changeEducation = feature => {
    let objOfFeature = feature.properties;
    for (let key of Object.keys(objOfFeature)) {
      if (objOfFeature['hex_education']) {
        feature.color = [1, 221, 160, 100];
      }
    }
  };
  const changeTourism = feature => {
    let objOfFeature = feature.properties;
    for (let key of Object.keys(objOfFeature)) {
      if (objOfFeature["hex_tourism"]) {
        feature.color = [45, 156, 219, 100];
      }
    }
  };
  const changeZdrav = feature => {
    let objOfFeature = feature.properties;
    for (let key of Object.keys(objOfFeature)) {
      if (objOfFeature['hex_zdrav']) {
        feature.color = [252, 88, 79, 100];
      }
    }
  };
  const changeET = feature => {
    let objOfFeature = feature.properties;
    for (let key of Object.keys(objOfFeature)) {
      if (objOfFeature['hex_education'] && objOfFeature['hex_tourism']) {
        feature.color = createRGBAGradient(
          [1, 251, 160, 180],
          [45, 120, 255, 200],
           7
        );
      }
      else if (objOfFeature["hex_education"]) {
        feature.color = [1, 221, 160, 150]
      }
      else if (objOfFeature["hex_tourism"]) {
        feature.color = [45, 156, 219, 150]
      }
    }
  };
  const changeEZ = feature => {
    let objOfFeature = feature.properties;
    for (let key of Object.keys(objOfFeature)) {
      if (objOfFeature['hex_education'] && objOfFeature['hex_zdrav']) {
        feature.color = createRGBAGradient(
          [1, 221, 160, 190],
          [255, 88, 79, 200],
          6
        );
      }
      else if (objOfFeature["hex_education"]) {
        feature.color = [1, 221, 160, 150]
      }
      else if (objOfFeature["hex_zdrav"]) {
        feature.color = [252, 88, 79, 150]
      }
    }
  };
  const changeZT = feature => {
    let objOfFeature = feature.properties;
    for (let key of Object.keys(objOfFeature)) {
      if (objOfFeature['hex_zdrav'] && objOfFeature['hex_tourism']) {
        feature.color = createRGBAGradient(
          [252, 88, 79, 180],
          [45, 156, 219, 200],
        5
        );
      }
      else if (objOfFeature["hex_tourism"]) {
        feature.color = [45, 156, 219, 150]
      }
      else if (objOfFeature["hex_zdrav"]) {
        feature.color = [252, 88, 79, 150]
      }
    }
  };
  const changeZTE = feature => {
    let objOfFeature = feature.properties;
    for (let key of Object.keys(objOfFeature)) {
      if (
        objOfFeature['hex_education'] &&
        objOfFeature['hex_zdrav'] &&
        objOfFeature['hex_tourism']
      ) {
        feature.color = createThreeColorGradient(
          [255, 30, 79, 210],
          [1, 200, 160, 170],
          [45, 50, 255, 200],
         7
        );
      }
      else if (objOfFeature["hex_tourism"]) {
        feature.color = [45, 156, 219, 150]
      }
      else if (objOfFeature["hex_zdrav"]) {
        feature.color = [252, 88, 79, 150]
      }
      else if (objOfFeature["hex_education"]) {
        feature.color = [1, 221, 160, 150]
      }
    }
  };

  for (const feature of educationFeatures) {
    changeEducation(feature);
  }
  for (const feature of tourismFeatures) {
    changeTourism(feature);
  }
  for (const feature of zdravFeatures) {
    changeZdrav(feature);
  }
  for (const feature of ETFeatures) {
    changeET(feature);
  }
  for (const feature of EZFeatures) {
    changeEZ(feature);
  }
  for (const feature of ZTFeatures) {
    changeZT(feature);
  }
  for (const feature of ZTEFeatures) {
    changeZTE(feature);
  }

  return {
    features,
    tourismFeatures,
    zdravFeatures,
    educationFeatures,
    ETFeatures,
    EZFeatures,
    ZTFeatures,
    ZTEFeatures
  };
};