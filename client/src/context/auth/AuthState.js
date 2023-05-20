import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from '../types';

import { useApolloClient } from '@apollo/client';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
        isAuthenticated: localStorage.getItem('token') ? true : false,
        loading: true,
        error: null,
    };

    const client = useApolloClient();
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Register User
    const register = async (data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post(
                'http://localhost:5005/api/users',
                data,
                config
            );

            console.log(res.data);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg,
            });
        }
    };
    //Login User
    const loginUser = async (data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post(
                'http://localhost:5005/api/auth',
                data,
                config
            );

            console.log(res);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        } catch (err) {
            console.error(err.response.data.msg);

            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg,
            });
        }
    };

    //Logout
    const logout = () => {
        client.resetStore();
        dispatch({
            type: LOGOUT,
        });
    };

    //Clear Errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                loginUser,
                register,
                clearErrors,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
