export const INITIAL_STATE = {
    name: "",
    surname: "",
    patronymic: "",
    job: "",
    number: "",
    email: "",
    seriesPassport: "",
    numPassport: "",
    birthday: "",
    issuedBy: "",
    dateOfIssue: "",
    gender: ""

};

export const ACTIONS = {
    CHANGE_INPUT: "CHANGE_INPUT",
}

export const officeReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.CHANGE_INPUT:
            return {
                ...state,
                [action.payload.name]:action.payload.value
            }

        default: {
            return state
        }
    }
}