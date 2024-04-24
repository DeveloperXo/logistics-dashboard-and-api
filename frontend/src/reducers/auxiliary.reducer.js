import { alertConstants } from "../constants/auxiliary.constants";

export const alertReducer = (state = { alertType: null, message: null }, action) => {
    switch(action.type) {
        case alertConstants.SUCCESS:
        case alertConstants.PRIMARY:
        case alertConstants.INFO:
        case alertConstants.DANGER:
        case alertConstants.WARNING:
            return {
                ...state,
                alertType: action.type,
                message: action.payload
            }
        default: {
            state
        }
    }
}