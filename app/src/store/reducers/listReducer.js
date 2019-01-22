import dotProp from "dot-prop-immutable";
import {
    ACTION_LIST_LOADING_LAMBDA_FUNCTIONS,
    ACTION_LIST_SET_LAMBDA_FUNCTIONS
} from "../actions/types";

/**
 *
 */
const defaultState = {
    lambdaFunction: {},
    loadingLambdaFunction: false,
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const list = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_LIST_LOADING_LAMBDA_FUNCTIONS:
            return {
                ...state,
                loadingLambdaFunction: true,
            };

        case ACTION_LIST_SET_LAMBDA_FUNCTIONS:
            const newState = dotProp.set(state, `lambdaFunction.${action.payload.accountId}`, action.payload.lambdaFunctions);

            return {
                ...newState,
                loadingLambdaFunction: false,
            };

        default:
            return state;
    }
};

export default list;
