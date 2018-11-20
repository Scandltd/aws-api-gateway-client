import { ACTION_SET_API_LIST, ACTION_AWS_API_CALL, ACTION_ADD_API } from './types';
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
 * @param data
 * @param onSuccess
 * @param onError
 *
 * @returns {Function}
 */
export const createApi = (accountId, data, onSuccess = null, onError = null) => {

    const types = [];
    if (data.type) {
        types.push(data.type);
    }

    const params = {
        name: data.name || '',
        //apiKeySource: HEADER | AUTHORIZER,
        //binaryMediaTypes: [
        //    'STRING_VALUE',
        //    /* more items */
        //],
        //cloneFrom: 'STRING_VALUE',
        description: data.description || '',
        endpointConfiguration: {
            types: types
        },
        //minimumCompressionSize: 0,
        //policy: 'STRING_VALUE',
        //version: 'STRING_VALUE'
    };

    return dispatch => {
        dispatch(apiCall(
            accountId,
            'createRestApi',
            params,
            response => {
                dispatch(addApi(accountId, response));
                if (onSuccess) {
                    onSuccess(response);
                }
            },
            err => {
                if (onError) {
                    onError(err);
                }
                console.log('api_create_rest_api_err', err);
            }
        ))
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

/**
 *
 * @param accountId
 * @param data
 *
 * @returns {{type: string, payload: {data: *, accountId: *}}}
 */
export const addApi = (accountId, data) => {
    console.log('addApi', accountId, data);


    return {
        type: ACTION_ADD_API,
        payload: {
            data: data,
            accountId: accountId
        }
    };
};