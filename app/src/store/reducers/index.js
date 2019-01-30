import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import apiReducer from './apiReducer';
import entriesReducer from './entriesReducer';
import appParamsReducer from './appParamsReducer';
import notificationReducer from './notificationReducer';
import settingsAccount from './settingsAccount';
import list from './listReducer';
import apiResourceDetail from './apiResourceDetailReducer';

export default combineReducers({
    account: accountReducer,
    api: apiReducer,
    entries: entriesReducer,
    appParams: appParamsReducer,
    notification: notificationReducer,
    settingsAccount,
    list,
    apiResourceDetail,
});
