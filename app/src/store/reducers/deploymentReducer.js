import { ACTION_DEPLOYMENT_CREATE_LOADING } from '../actions/types';

/**
 *
 */
const defaultState = {
    loading: false,
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const deploymentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_DEPLOYMENT_CREATE_LOADING:

            return {
                ...state,
                loading: action.payload.loading,
            };

        default:
            return state;
    }
};

export default deploymentReducer;
