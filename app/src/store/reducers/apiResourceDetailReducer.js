import {
    ACTION_API_DETAIL_SET_FILTER_VALUE,
    ACTION_API_DETAIL_SET_DEFAULT_STATE,
} from "../actions/types";

/**
 *
 */
const defaultState = {
    qString: '',
    httpMethod: ''
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const appParamsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_API_DETAIL_SET_FILTER_VALUE:

            return {
                ...state,
                qString: action.payload.qString,
                httpMethod: action.payload.httpMethod.toUpperCase(),
            };

        case ACTION_API_DETAIL_SET_DEFAULT_STATE:

            return defaultState;

        default:
            return state;
    }
};

export default appParamsReducer;
