import { customerConstants } from '../constants/manageUser.constants';

export const getCustomers = (axiosPrivate, query) => async (dispatch) => {
    try {
        dispatch({ type: customerConstants.GET_CUSTOMER_REQUEST });
        
        let isMounted = true;
        const controller = new AbortController();
        let response;

        if (query) {
            response  = await axiosPrivate.get(`/customer/customer/paginate/${query?.page}/${query?.limit}`, {
                signal: controller.signal
            });
        } else {
            response  = await axiosPrivate.get(`/customer/customer/paginate/1/10`, {
                signal: controller.signal
            });
        }

        const users = response.data?.results;

        dispatch({ type: customerConstants.GET_CUSTOMER_SUCCESS, payload: users });
        return () => {
            isMounted = false;
            controller.abort();
        }
    } catch (err) {
        console.log(err)
        if (!err?.response) {
            dispatch({ type: customerConstants.GET_CUSTOMER_FAIL, payload: 'Server error.' });
        } else if (err.response?.data?.message) {
            dispatch({ type: customerConstants.GET_CUSTOMER_FAIL, payload: err.response.data.message });
        }
        else {
            dispatch({ type: customerConstants.GET_CUSTOMER_FAIL, payload: 'Something went wrong' });
        }
    }
}

export const getBAs = (axiosPrivate, query) => async (dispatch) => {
    try {
        dispatch({ type: customerConstants.GET_CUSTOMER_REQUEST });
        
        let isMounted = true;
        const controller = new AbortController();
        let response;

        if (query) {
            response  = await axiosPrivate.get(`/customer/customer/filter/businessAssociate/${query?.page}/${query?.limit}`, {
                signal: controller.signal
            });
        } else {
            response  = await axiosPrivate.get(`/customer/customer/filter/businessAssociate/1/10`, {
                signal: controller.signal
            });
        }

        const users = response.data?.results;

        dispatch({ type: customerConstants.GET_CUSTOMER_SUCCESS, payload: users });
        return () => {
            isMounted = false;
            controller.abort();
        }
    } catch (err) {
        if (!err?.response) {
            dispatch({ type: customerConstants.GET_CUSTOMER_FAIL, payload: 'Server error.' });
        } else if (err.response?.data?.message) {
            dispatch({ type: customerConstants.GET_CUSTOMER_FAIL, payload: err.response.data.message });
        }
        else {
            dispatch({ type: customerConstants.GET_CUSTOMER_FAIL, payload: 'Something went wrong' });
        }
    }
}

export const fetchUserAccs = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.get('/userAccount/userAccount/get-names', {
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (err) {
        console.log(err)
        if (err?.response?.data?.message) {
            return { message: err.response.data.message }
        } else {
            return { message: 'Something unexpected happend. Cannot fetch user accounts...' }
        }
    }
}

export const fetchCustomer = async (id, axiosPrivate) => {
    try {
        const response = await axiosPrivate.get(`customer/customer/this/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (err) {
        console.log(err)
        if (err?.response?.data?.message) {
            return { message: err.response.data.message }
        } else {
            return { message: 'Something unexpected happend. Cannot fetch user accounts...' }
        }
    }
}