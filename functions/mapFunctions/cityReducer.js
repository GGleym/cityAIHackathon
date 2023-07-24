export const CITY_INITIAL_STATE = {
    name: "",
    cityCoordinates: [33.08266, 68.95852],
    region: [],
    population: "",
    area: "",
    boundaries: [],
    selectValueName: ""
}

export const ACTIONS_CITY = {
    CHANGE_CITY: "CHANGE_CITY",
}

export const cityReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS_CITY.CHANGE_CITY: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}