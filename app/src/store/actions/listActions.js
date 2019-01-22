import {
    ACTION_LIST_LOADING_LAMBDA_FUNCTIONS,
    ACTION_LIST_SET_LAMBDA_FUNCTIONS
} from './types';

import {
    getLambdaFunctions as getLambdaFunctionsRequest
} from '../../services/api/listApi';
import { addErrorNotification } from './notificationActions';

/**
 *
 * @param accountId
 * @returns {function(*): Promise<T | never>}
 */
export const getLambdaFunctions = (accountId) => {
    return dispatch => {
        dispatch(setLoadingLambdaFunctions());
        return getLambdaFunctionsRequest(accountId)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to retrieve lambda functions'));

                    return data;
                }

                dispatch(setLambdaFunctions(accountId, data));

                return data;
            })
            .catch(err => {
                setLambdaFunctions(accountId, null);
                dispatch(addErrorNotification(err.message || 'Unable to retrieve lambda functions'));

            })
    };
};

/**
 *
 * @returns {{type: string}}
 */
export const setLoadingLambdaFunctions = () => {
    return {
        type: ACTION_LIST_LOADING_LAMBDA_FUNCTIONS,
    };
};

/**
 *
 * @param accountId
 * @param lambdaFunctions
 * @returns {{payload: {accountId: *, lambdaFunctions: *}, type: string}}
 */
export const setLambdaFunctions = (accountId, lambdaFunctions) => {
    return {
        type: ACTION_LIST_SET_LAMBDA_FUNCTIONS,
        payload: {
            accountId,
            lambdaFunctions
        }
    }
};