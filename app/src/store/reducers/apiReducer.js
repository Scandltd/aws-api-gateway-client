import {ACTION_ADD_API, ACTION_SET_API_LIST, ACTION_DELETE_API } from '../actions/types';
import dotProp from 'dot-prop-immutable';

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

        default:
            return state;
    }
};

export default apiReducer;
