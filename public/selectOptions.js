import citiesJson from "../public/geoJSONs/areas.geojson"

const options = (function() {
    let options = []
    let i = 0

    for (let key of Object.keys(citiesJson)) {
        options[i] = {
            value: citiesJson[key]["name"],
            label: key
        }
        i++
    }
    return options
})()

const filterColors = (inputValue) => {
    return options.filter((option) => {
        return option.label.toLowerCase().includes(inputValue.toLowerCase())
    })
}


export const loadOptions = (inputValue) => {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(filterColors(inputValue))
        }, 1000)
    })
}

