import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import apiReducer from './apiReducer';
import entriesReducer from './entriesReducer';

export default combineReducers({
  account: accountReducer,
  api: apiReducer,
  entries: entriesReducer
});
