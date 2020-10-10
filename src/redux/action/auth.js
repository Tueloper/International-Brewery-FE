/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
// import axios from 'utils/axios';
import axios from 'axios';
// eslint-disable-next-line camelcase
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import {
  POST_SIGN_UP, POST_SIGN_UP_FAIL, LOAD_USER_FAIL, LOAD_USER,
  UPDATE_PROFILE, UPDATE_PROFILE_ERROR,
  LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, GET_USER_PROFILE, GET_USER_PROFILE_ERROR, UPDATE_PASSWORD_ERROR,
} from '../actionTypes/authTypes';
// import setAuthToken from '../../utils/setToken';
import uploadImg from '../../utils/upload';
import { setAlert } from './alert';

const { REACT_APP_API_URL, REACT_APP_USER_PROFILE } = process.env;

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
    // const decoded = jwt_decode(res.data.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data.token,
    });
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

export const getProfile = () => async (dispatch) => {
  try {
    let res = await axios.get(`${REACT_APP_API_URL}v1.0/api/auth/profile`);
    res = res.data.data.user;
    if (res.birthDate !== null) {
      const birthDate = moment(res.birthDate).format('L');
      res = { ...res, birthDate };
    }

    dispatch({
      type: GET_USER_PROFILE,
      payload: res,
    });
  } catch (err) {
    { err.message.startsWith('Network') ? dispatch(setAlert(err.message, 'danger')) : dispatch(setAlert(err.response.data.error.message, 'danger')); }
    dispatch({
      type: GET_USER_PROFILE_ERROR,
      payload: err.response.data.error.message,
    });
  }
};

export const updatePassword = (profile) => async (dispatch) => {
  const { oldPassword } = profile;
  try {
    let res;
    if (oldPassword) res = await axios.post(`${REACT_APP_API_URL}v1.0/api/auth/reset-password`, profile);
    dispatch(setAlert(res.data.data.message, 'success'));
  } catch (err) {
    { err.message.startsWith('Network') ? dispatch(setAlert(err.message, 'danger')) : dispatch(setAlert(err.response.data.error.message, 'danger')); }
    dispatch({
      type: UPDATE_PASSWORD_ERROR,
      payload: err.response.data.error.message,
    });
  }
};

export const updateProfile = (profile) => async (dispatch) => {
  let {
    firstName, profileImage, phoneNumber, upload, lastName, gender,
  } = profile;
  // return console.log(profile);
  try {
    const up = await uploadImg(upload, REACT_APP_USER_PROFILE);
    profileImage = up;
    // console.log(profileImage);
    const res = await axios.put(`${REACT_APP_API_URL}v1.0/api/auth/profile`, {
      firstName, profileImage, phoneNumber, lastName, gender,
    });
    // return console.log(res);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data.user,
    });
    dispatch(getProfile());
    dispatch(setAlert('Profile Updated Succesfully', 'success'));
  } catch (err) {
    { err.message.startsWith('Network') ? dispatch(setAlert(err.message, 'danger')) : dispatch(setAlert(err.response.data.error.message, 'danger')); }
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: err.response.data.error.message,
    });
  }
};
