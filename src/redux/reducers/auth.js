/* eslint-disable max-len */
import {
  LOAD_USER,
} from '../actionTypes/authTypes';

const initialState = {
  appName: 'inventory'

};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        appName: 'inventory'
      };

    default:
      return state;
  }
};
