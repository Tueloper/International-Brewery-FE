import { combineReducers } from 'redux';
import Auth from './auth';
import Alert from './alert';


const rootReducer = combineReducers({
  Alert,
  Auth,
});

export default rootReducer;
