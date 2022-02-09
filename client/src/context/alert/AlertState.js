import React, {useReducer} from "react";
import {v4 as uuidv4} from "uuid"

import AlertContext from "./alertContext";
import alertReducer from './alertReducer'
import {
    SET_ALERT, REMOVE_ALERT
} from '../types';
//needs to be refactored to better id alerts or type them...might have to do on backend
const AlertState = (props) => {
    const initialState = []

    const [state, dispatch] = useReducer(alertReducer, initialState);

    //set Alert using uuid to have id when mapping errors
    const setAlert = (msg) => {
        const id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: {msg, id}
        });

        setTimeout(() => dispatch({
            type: REMOVE_ALERT,
            payload: id
        }), 2500)
    }

    return (
        <AlertContext.Provider
            value = {{
                alerts: state,
                setAlert
            }}>
            {props.children}
        </AlertContext.Provider>
    );
}

export default AlertState;