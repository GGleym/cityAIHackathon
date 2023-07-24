export const TOGGLE_INITIAL = {
    objects_education: false,
    objects_tourism: false,
    objects_zdrav: false,
    hex_education: false,
    hex_tourism: false,
    hex_zdrav: false
}


export const ACTIONS_TOGGLE = {
    CHANGE_TOGGLE: "CHANGE_TOGGLE",
    CHANGE_TOGGLE_HEX: "CHANGE_TOGGLE_HEX"
}

export const toggleReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS_TOGGLE.CHANGE_TOGGLE: {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        }
        case ACTIONS_TOGGLE.CHANGE_TOGGLE_HEX: {
            return {
                ...state,
                [action.payload.id]: action.payload.value
            }
        }
    }
}