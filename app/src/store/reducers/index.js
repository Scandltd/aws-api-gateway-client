import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import apiReducer from './apiReducer';

export default combineReducers({
  account: accountReducer,
  api: apiReducer
});
