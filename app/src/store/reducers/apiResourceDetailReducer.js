import {
    ACTION_SET_FILTER_VALUE,
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
        case ACTION_SET_FILTER_VALUE:

            return {...state, qString: action.payload.qString};

        default:
            return state;
    }
};

export default appParamsReducer;
