import {ACTION_ADD_API, ACTION_SET_API_LIST, ACTION_DELETE_API, ACTION_UPDATE_API } from '../actions/types';
import dotProp from 'dot-prop-immutable';
import { findIndex } from 'lodash';

/**
 * 
 */
const defaultState = {
    apiList: {},
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
const apiReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_SET_API_LIST:
            if (!Array.isArray(action.payload.apiList)) {
                return state;
            }

            return dotProp.set(state, `apiList.${action.payload.accountId}`, action.payload.apiList);

        case ACTION_ADD_API:

            return dotProp.merge(state, `apiList.${action.payload.accountId}`, [action.payload.data]);

        case ACTION_DELETE_API:
            const updatedList = state.apiList[action.payload.accountId].filter(item => item.id !== action.payload.apiId);

            return dotProp.set(state, `apiList.${action.payload.accountId}`, updatedList);

        case ACTION_UPDATE_API:
            if (!Array.isArray(state.apiList[action.payload.accountId])) {
                return state;
            }

            const index = findIndex(state.apiList[action.payload.accountId], {id: action.payload.data.id});
            if (-1 === index) {
                return state;
            }

            return dotProp.set(state, `apiList.${action.payload.accountId}.${index}`, action.payload.data);

        default:
            return state;
    }
};

export default apiReducer;
