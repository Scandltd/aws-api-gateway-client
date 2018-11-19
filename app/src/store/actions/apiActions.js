import { ACTION_SET_API_LIST, ACTION_AWS_API_CALL } from './types';
import {setAccountLoaded} from './accountActions';

/**
 * 
 * @param {*} accountId
 */
export const loadApiList = (accountId) => {
    return dispatch => {
        dispatch(apiCall(
            accountId,
            'fetchApiList',
            {},
            response => {
                dispatch(setAccountLoaded(accountId));
                dispatch(setApiList(accountId, response.items));
            },
            err => {
                console.log('api_action_err', err);
            }
        ));
    };
};

/**
 *
 * @param accountId
 * @param method
 * @param data
 * @param onSuccess
 * @param onError
 *
 * @returns {{type: string, payload: {accountId: *, method: *, data, onSuccess: *, onError: *}}}
 */
export const apiCall = (accountId, method, data = {}, onSuccess = null, onError = null) => {
    return {
        type: ACTION_AWS_API_CALL,
        payload: {
            accountId: accountId,
            method: method,
            data: data,
            onSuccess: onSuccess,
            onError: onError,
        }
    }
};

/**
 * 
 * @param {*} accountId 
 * @param {*} apiList 
 */
export const setApiList = (accountId, apiList) => {
    return {
        type: ACTION_SET_API_LIST,
        payload: {
            apiList:apiList,
            accountId: accountId
        }
    }
};