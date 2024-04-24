import { userAuthConstants } from "../constants/user.constants";
import { alertConstants } from "../constants/auxiliary.constants";

export const userReducer = (state = { loading: false, isAuthenticated: false }, action) => {
    switch (action.type) {
        case userAuthConstants.LOGIN_REQUEST:
        case userAuthConstants.REGISTER_REQUEST:
        case userAuthConstants.LOAD_USER_REQUEST:
        case userAuthConstants.LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            };

        case userAuthConstants.LOGIN_SUCCESS:
        case userAuthConstants.REGISTER_SUCCESS:
        case userAuthConstants.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case userAuthConstants.LOGIN_FAIL:
        case userAuthConstants.REGISTER_FAIL:
        case userAuthConstants.LOAD_USER_FAIL: 
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                message: action.payload,
                messageType: alertConstants.DANGER
            }
        case userAuthConstants.LOGOUT_SUCCESS: 
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                type: action.type
            }
        case userAuthConstants.LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
                messageType: alertConstants.DANGER
            }
        case userAuthConstants.CLEAR_ERRORS:
            return {
                ...state,
                message: null
            }
        default: 
            return state;
    }
};