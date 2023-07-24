
export const parseObjects = async (cityName) => {
    try {
        const objectEducation = await fetch(`geoJSONs/objects_education/${cityName}.geojson`)
        const objectTourism = await fetch(`geoJSONs/objects_tourism/${cityName}.geojson`)
        const objectZdrav = await fetch(`geoJSONs/objects_zdrav/${cityName}.geojson`)

        return {
            objectsEducation: await objectEducation.json(),
            objectsTourism: await objectTourism.json(),
            objectsZdrav: await objectZdrav.json()
        }
    }
    catch (error) {
        console.error("Error parsing data:", error)
    }
}