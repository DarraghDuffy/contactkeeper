import React, { useReducer, createContext } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //set Alert
  const setAlert = (msg, type) => {
    const id = v4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
