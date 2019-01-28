import {
    ACTION_API_DETAIL_SET_FILTER_VALUE,
    ACTION_API_DETAIL_SET_DEFAULT_STATE,
} from "../actions/types";

/**
 *
 */
const defaultState = {
    qString: '',
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const appParamsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_API_DETAIL_SET_FILTER_VALUE:

            return {...state, qString: action.payload.qString};

        case ACTION_API_DETAIL_SET_DEFAULT_STATE:

            return defaultState;

        default:
            return state;
    }
};

export default appParamsReducer;
