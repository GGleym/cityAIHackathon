function isInside(point, polygon) {
    const reversedPolygon = polygon[0].reverse()
    const x = point[0];
    const y = point[1];
    let isInside = false;

    for (let i = 0, j = reversedPolygon.length - 1; i < reversedPolygon.length; j = i++) {
        const xi = reversedPolygon[i][0];
        const yi = reversedPolygon[i][1];
        const xj = reversedPolygon[j][0];
        const yj = reversedPolygon[j][1];

        const intersect =
            yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

        if (intersect) {
            isInside = !isInside
        }
    }
    return isInside
}

export const filterObjects = (nonFilteredObjects, boundaries) => {

    return nonFilteredObjects.filter((obj) => isInside(obj["geometry"]["coordinates"], boundaries))
}