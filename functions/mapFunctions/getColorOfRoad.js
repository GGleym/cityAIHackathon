export const getColorOfRoadHexes = obj => {
    if (
        obj['properties']['minutes'] &&
        obj['properties']['minutes'] > 0.05 &&
        obj['properties']['minutes'] < 0.07
    ) {
        return [255, 255, 0, 60];
    } else if (
        obj['properties']['minutes'] &&
        obj['properties']['minutes'] < 0.05
    ) {
        return [1, 221, 160, 60];
    } else if (
        obj['properties']['minutes'] &&
        obj['properties']['minutes'] > 0.07
    ) {
        return [252, 88, 79, 60];
    } else if (obj['properties']['meters'] > 80) {
        return [252, 88, 79, 60];
    } else if (obj['properties']['meters'] < 80) {
        return [1, 221, 160, 60];
    } else {
        return [255, 255, 0, 60];
    }
};
