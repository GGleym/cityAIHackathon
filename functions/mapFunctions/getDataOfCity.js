import cities from '../../public/JSONs/citiesInfo.json';

export const getDataOfCity = cityName => {
  const objInfoCity = {
    cityCoordinates: [],
    region: "",
    population: "",
    area: "",
    boundaries: []
  };

  let objCity = cities.find(city => {
    return city['city'].toLowerCase() === cityName.toLowerCase();
  });

  //Добавишь, когда будет нормальный json c площадью и координатами.
  // let areaStr = objCity["area"].toString()
  // objInfoCity["area"] = `${areaStr.slice(0,3)} ${areaStr.slice(3,6)}`
  objInfoCity["cityCoordinates"] = [objCity["lat"], objCity["lon"]]
  objInfoCity["region"] = `${objCity["federal_district"]} федеральный округ, ${objCity["region_name"]}`
  objInfoCity["boundaries"] = objCity["boundaries"]
  let populationStr = (Number(objCity["population"]) * 1000).toString()
  objInfoCity["population"] = populationStr.length === 6 ? `${populationStr.slice(0, 3)} ${populationStr.slice(3, 6)}` :
      `${populationStr.slice(0,2)} ${populationStr.slice(2, 5)} ${populationStr.slice(5,8)}`

  return objInfoCity
};
