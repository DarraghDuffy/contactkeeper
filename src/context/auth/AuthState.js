import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import { users, auth } from '../../config/config';
import AuthContext from './contextAuth';
import AuthReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

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
  const loadUser = async () => {
    // the JWT token will be set globally - if it exists
    //make request to the utils file setAuthToken - imported above
    setAuthToken();

    try {
      const res = await axios.get(auth); //api/auth
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  //register user
  const register = async (userData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(users, userData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      let errorObj = null;
      if (error.response.data.errors) {
        errorObj = error.response.data.errors;
      } else {
        errorObj = [{ msg: error.response.data.message }];
      }
      dispatch({ type: REGISTER_FAIL, payload: errorObj });
    }
  };

  //login user
  const login = async (userData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(auth, userData, config); // POSTS to /api/auth
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      let errorObj = null;
      if (error.response.data.errors) {
        errorObj = error.response.data.errors;
      } else {
        errorObj = [{ msg: error.response.data.message }];
      }
      dispatch({ type: LOGIN_FAIL, payload: errorObj });
    }
  };

  //logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  //clear errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
