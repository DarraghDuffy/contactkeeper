import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import AuthContext from './contextAuth';
import AuthReducer from './authReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //load user

  //register user

  //login user

  //logout

  //clear errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
