import { customerConstants } from "../constants/manageUser.constants";

export const customerReducer = (state = { isLoading: false, users: null }, action) => {
    switch (action.type) {
        case customerConstants.GET_CUSTOMER_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case customerConstants.GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.payload
            }

        case customerConstants.GET_CUSTOMER_FAIL:
            return {
                ...state,
                isLoading: false,
                users: null,
                message: action.payload,
            }

        default: 
            return state;
    }
}