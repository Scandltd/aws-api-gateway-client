import {ACTION_SET_API_LIST} from '../actions/types';
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
const accountReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_SET_API_LIST:
            if (!Array.isArray(action.payload.apiList)) {
                return state;
            }

            return dotProp.set(state, `apiList.${action.payload.accountId}`, action.payload.apiList);

        default:
            return state;
    }
};

export default accountReducer;