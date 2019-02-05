import { combineReducers } from 'redux';
import account from './accountReducer';
import api from './apiReducer';
import entries from './entriesReducer';
import appParams from './appParamsReducer';
import notification from './notificationReducer';
import settingsAccount from './settingsAccount';
import list from './listReducer';
import apiResourceDetail from './apiResourceDetailReducer';
import stages from './stagesReducer';
import deployment from './deploymentReducer';
import stageDetail from './stageDetailReducer';

export default combineReducers({
    account,
    api,
    entries,
    appParams,
    notification,
    settingsAccount,
    list,
    apiResourceDetail,
    stages,
    deployment,
    stageDetail,
});
