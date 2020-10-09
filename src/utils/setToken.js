import axios from 'axios';

const { REACT_APP_API_URL } = process.env;
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.baseURL = REACT_APP_API_URL;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthToken;
