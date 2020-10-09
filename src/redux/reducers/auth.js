/* eslint-disable max-len */
import {
  LOAD_USER, POST_SIGN_UP, POST_SIGN_UP_FAIL, LOAD_USER_FAIL, LOG_OUT, LOGIN_SUCCESS, LOGIN_FAIL,
} from '../actionTypes/authTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loader: true,
  sessionUser: null,
  sessionError: null,
  user: null,
  loading: true,
  loginError: false,

};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        sessionUser: payload,
        loading: false,
        userJoinCompany: false,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        sessionError: payload,
        loading: false,
      };
    case POST_SIGN_UP:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        user: payload,
        loader: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
        loader: false,
      };
    case LOG_OUT:
    case LOGIN_FAIL:
    case POST_SIGN_UP_FAIL:
      localStorage.clear('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loader: false,
        user: null,
        loadVerification: true,
        verificationStatus: null,
        loginError: true,
      };
    default:
      return state;
  }
};
