import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import apiReducer from './apiReducer';
import entriesReducer from './entriesReducer';
import appParamsReducer from './appParamsReducer';

export default combineReducers({
  account: accountReducer,
  api: apiReducer,
  entries: entriesReducer,
  appParams: appParamsReducer
});
