export const BTN_TYPES_STATE = {
    classic: false,
    transport: false,
}

export const BTN_TYPES_ACTIONS = {
    CHANGE_TYPE: "CHANGE_TYPE"
}

export const btnTypesReducer = (state, action) => {
    switch (action.type) {
        case BTN_TYPES_ACTIONS.CHANGE_TYPE:
            return {
                ...state,
            }
    }
}