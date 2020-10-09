/* eslint-disable prefer-const */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
// import axios from 'utils/axios';
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import {
  POST_SIGN_UP, POST_SIGN_UP_FAIL, LOAD_USER_FAIL, LOAD_USER,
  LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT,
} from '../actionTypes/authTypes';
import setAuthToken from '../../utils/setToken';
import { setAlert } from './alert';

const { REACT_APP_API_URL } = process.env;

const check = () => {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const date = Date.now() / 1000;
  if (decoded.exp < date) {
    localStorage.clear('token');
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    check();
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    if (!token) {
      dispatch(setAlert('Please Login , authorization denied', 'error'));
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
    dispatch({
      type: LOAD_USER,
      payload: decoded,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: err.message,
    });
  }
};

export const postSignUp = (
  {
    firstName, lastName, email, password,
  },
) => async (dispatch) => {
  let body;

  body = {
    firstName,
    lastName,
    email,
    password,
  };
  try {
    const res = await axios.post(`${REACT_APP_API_URL}v1.0/api/auth/signup`, body);
    dispatch({
      type: POST_SIGN_UP,
      payload: res.data.data.user,
    });
    dispatch(loadUser());
    dispatch(setAlert('success', 'success'));
  } catch (err) {
    { err.message.startsWith('Network') ? dispatch(setAlert(err.message, 'danger')) : dispatch(setAlert(err.response.data.error.message, 'danger')); }
    dispatch({
      type: POST_SIGN_UP_FAIL,
      // payload: err.response.data.error.message,
    });
  }
};

export const postLogIn = (email, password, history) => async (dispatch) => {
  try {
    const res = await axios.post(`${REACT_APP_API_URL}v1.0/api/auth/login`, { email, password });
    const decoded = jwt_decode(res.data.data.token);
    // console.log(decoded);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data.token,
    });

    // dispatch(getVerificationStatus());
    dispatch(loadUser());
    if (decoded.companyId === null) {
      history.push('/company_signup');
    }
    if (decoded.companyId !== null) {
      history.push('/');
    }
    dispatch(setAlert('success', 'success'));
  } catch (err) {
    { err.message.startsWith('Network') ? dispatch(setAlert(err.message, 'danger')) : dispatch(setAlert(err.response.data.error.message, 'danger')); }
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOG_OUT });
  // dispatch({ type: GET_TOKEN_ERROR });
};
