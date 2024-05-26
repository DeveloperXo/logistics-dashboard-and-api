import { userAuthConstants } from "../constants/user.constants";
import axios from "../api/axios";
import { axiosPrivate } from "../api/axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: userAuthConstants.LOGIN_REQUEST });
        const response = await axios.post('/common/auth/login', JSON.stringify({ email, password }), {
            headers: { 'Content-Type': 'application/json' }
        });

        const user = response?.data?.results;
        const refreshToken = response?.data?.results?.tokens?.refresh?.token;

        localStorage.setItem('log_refresh', JSON.stringify(refreshToken));
        dispatch({ type: userAuthConstants.LOGIN_SUCCESS, payload: user });
    } catch (err) {
        if (!err?.response) {
            dispatch({ type: userAuthConstants.LOGIN_FAIL, payload: 'Server error.' });
        } else if (err.response?.data?.message) {
            dispatch({ type: userAuthConstants.LOGIN_FAIL, payload: err.response.data.message });
        }
        else {
            dispatch({ type: userAuthConstants.LOGIN_FAIL, payload: 'Login failed' });
        }
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: userAuthConstants.LOGOUT_REQUEST });
        const payload = {
            refreshToken: JSON.parse(localStorage.getItem('log_refresh'))
        }
        const response = await axiosPrivate.post('/common/auth/logout', JSON.stringify(payload), {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.data?.results?.success) {
            localStorage.removeItem('log_refresh');
            dispatch({ type: userAuthConstants.LOGOUT_SUCCESS });
        } else {
            dispatch({ type: userAuthConstants.LOGOUT_FAIL, payload: 'Logout failed. Cannot logout.' });
        }
    } catch (error) {
        dispatch({ type: userAuthConstants.LOGOUT_FAIL, payload: 'Logout failed. Cannot logout.' });
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: userAuthConstants.CLEAR_ERRORS });
};