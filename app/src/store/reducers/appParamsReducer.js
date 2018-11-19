import { ACTION_SET_LOADING_TRUE, ACTION_SET_LOADING_FALSE } from '../actions/types';

/**
 *
 */
const defaultState = {
    isLoading: false
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const appParamsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_SET_LOADING_TRUE:

            return {...state, isLoading: true};

        case ACTION_SET_LOADING_FALSE:

            return {...state, isLoading: false};

        default:
            return state;
    }
};

export default appParamsReducer;