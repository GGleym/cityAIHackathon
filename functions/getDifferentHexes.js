export const getDifferentHexes = async (cityName) => {
   const getHexes = await fetch(`/geoJSONs/hexes/${cityName}.geojson`)
    const responseHexes = await getHexes.json()

    const features = responseHexes.features

    const educationFeatures = JSON.parse(JSON.stringify(features))
    const tourismFeatures = JSON.parse(JSON.stringify(features))
    const zdravFeatures = JSON.parse(JSON.stringify(features))
    const ETFeatures = JSON.parse(JSON.stringify(features)) //education and tourism toggles
    const EZFeatures = JSON.parse(JSON.stringify(features)) //education and zdrav toggles
    const ZTFeatures = JSON.parse(JSON.stringify(features)) //zdrav and tourism toggles
    const ZTEFeatures = JSON.parse(JSON.stringify(features)) //zdrav and tourism and education toggles

    const changeEducation = (feature) => {
        let objOfFeature = feature.properties
        for (let key of Object.keys(objOfFeature)) {
            if (objOfFeature["hex_education"]) {
                feature.color = [0, 255, 0, 100]
            }
        }
    }
    const changeTourism = (feature) => {
        let objOfFeature = feature.properties
        for (let key of Object.keys(objOfFeature)) {
            if (objOfFeature["hex_tourism"]) {
                feature.color = [0, 0, 255, 100]
            }
        }
    }
    const changeZdrav = (feature) => {
        let objOfFeature = feature.properties
        for (let key of Object.keys(objOfFeature)) {
            if (objOfFeature["hex_zdrav"]) {
                feature.color = [255, 0, 0, 100]
            }
        }
    }
    const changeET = (feature) => {
        let objOfFeature = feature.properties
        for (let key of Object.keys(objOfFeature)) {
            if (objOfFeature["hex_education"] && objOfFeature["hex_tourism"]) {
                feature.color = [0, 255, 255, 100]
            }
        }
    }
    const changeEZ = (feature) => {
        let objOfFeature = feature.properties
        for (let key of Object.keys(objOfFeature)) {
            if (objOfFeature["hex_education"] && objOfFeature["hex_zdrav"]) {
                feature.color = [255, 255, 0, 100]
            }
        }
    }
    const changeZT = (feature) => {
        let objOfFeature = feature.properties
        for (let key of Object.keys(objOfFeature)) {
            if (objOfFeature["hex_zdrav"] && objOfFeature["hex_tourism"]) {
                feature.color = [255, 0, 255, 100]
            }
        }
    }
    const changeZTE = (feature) => {
        let objOfFeature = feature.properties
        for (let key of Object.keys(objOfFeature)) {
            if (objOfFeature["hex_education"] && objOfFeature["hex_zdrav"] && objOfFeature["hex_tourism"]) {
                feature.color = [255, 255, 255, 100]
            }
        }
    }

    for (const feature of educationFeatures) {
        changeEducation(feature)
    }
    for (const feature of tourismFeatures) {
        changeTourism(feature)
    }
    for (const feature of zdravFeatures) {
        changeZdrav(feature)
    }
    for (const feature of ETFeatures) {
        changeET(feature)
    }
    for (const feature of EZFeatures) {
        changeEZ(feature)
    }
    for (const feature of ZTFeatures) {
        changeZT(feature)
    }
    for (const feature of ZTEFeatures) {
        changeZTE(feature)
    }

    return {
        features,
        tourismFeatures,
        zdravFeatures,
        educationFeatures,
        ETFeatures,
        EZFeatures,
        ZTFeatures,
        ZTEFeatures,
    }
}