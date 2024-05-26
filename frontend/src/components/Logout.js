import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from "../actions/user.action";
import { userAuthConstants } from "../constants/user.constants";

const Logout = () => {
    const dispatch = useDispatch();
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const { message, type } = useSelector(state => state.user);

    useEffect(() => {
        console.log(message);
        if (type == userAuthConstants.LOGOUT_SUCCESS) {
            setAuth({});
            return navigate('/login');
        }
    }, [type]);
    
    useEffect(() => {
        dispatch(logout());
    }, []);

    
}

export default Logout;