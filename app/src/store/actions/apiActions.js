import { ACTION_SET_API_LIST, ACTION_AWS_API_CALL, ACTION_ADD_API, ACTION_DELETE_API, ACTION_UPDATE_API } from './types';
import {setAccountLoaded} from './accountActions';
import { forIn } from 'lodash';
import { addErrorNotification, addSuccessNotification } from './notificationActions';

/**
 * 
 * @param {*} accountId
 */
export const loadRestApiListRequest = (accountId) => {
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
                dispatch(addErrorNotification(err.message));
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
export const createRestApiRequest = (accountId, data, onSuccess = null, onError = null) => {

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
                dispatch(addSuccessNotification('A new REST API instance has been created'));
            },
            err => {
                if (onError) {
                    onError(err);
                }
                dispatch(addErrorNotification('Unable to create REST API. ' + err.message));
            }
        ))
    };
};

/**
 *
 * @param accountId
 * @param apiId
 * @param onSuccess
 * @param onError
 *
 * @returns {Function}
 */
export const deleteRestApiRequest = (accountId, apiId, onSuccess = null, onError = null) => {
    const params = {
        restApiId: apiId
    };

    return dispatch => {
        dispatch(apiCall(
            accountId,
            'deleteRestApi',
            params,
            response => {
                dispatch(removeApi(accountId, apiId));
                if (onSuccess) {
                    onSuccess(response);
                }
                dispatch(addSuccessNotification('The REST API instance has been deleted'));
            },
            err => {
                if (onError) {
                    onError(err);
                }
                dispatch(addErrorNotification('Unable to delete REST API. ' + err.message));
            }
        ))
    };
};

/**
 *
 * @param accountId
 * @param apiId
 * @param data
 * @param oldData
 * @param onSuccess
 * @param onError
 */
export const updateRestApiRequest = (accountId, apiId, data, oldData, onSuccess = null, onError = null) => {
    const path = {
        name: '/name',
        description: '/description',
        type: '/endpointConfiguration/types/'
    };

    const patchOperations = [];
    forIn(data, function(value, key) {
        if (path[key] && value !== oldData[key]) {
            patchOperations.push({
                "op" : "replace",
                "path" : 'type' === key ? path[key] + oldData[key] : path[key],
                "value" : value
            });
        }
    });

    const params = {
        restApiId: apiId,
        patchOperations: patchOperations
    };

    return dispatch => {dispatch(apiCall(
        accountId,
        'updateRestApi',
        params,
        response => {
            dispatch(updateApi(accountId, response));
            if (onSuccess) {
                onSuccess(response);
            }
            dispatch(addSuccessNotification('The REST API instance has been updated'));
        },
        err => {
            if (onError) {
                onError(err);
            }
            dispatch(addErrorNotification('Unable to update REST API. ' + err.message));
        }
    ))}
};
/**
 *
 * @param accountId
 * @param apiId
 * @param onSuccess
 * @param onError
 *
 * @returns {Function}
 */
export const getRestApiRequest = (accountId, apiId, onSuccess = null, onError = null) => {
    const params = {
        restApiId: apiId
    };

    return dispatch => {dispatch(apiCall(
        accountId,
        'getRestApi',
        params,
        response => {
            if (onSuccess) {
                onSuccess(response);
            }
        },
        err => {
            if (onError) {
                onError(err);
            }
            dispatch(addErrorNotification('Unable to fetch REST API data. ' + err.message));
        }
    ))}
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

    return {
        type: ACTION_ADD_API,
        payload: {
            data: data,
            accountId: accountId
        }
    };
};

/**
 *
 * @param accountId
 * @param apiId
 *
 * @returns {{type: string, payload: {accountId: *, apiId: *}}}
 */
export const removeApi = (accountId, apiId) => {
    return {
        type: ACTION_DELETE_API,
        payload: {
            accountId: accountId,
            apiId: apiId
        }
    };
};

/**
 *
 * @param accountId
 * @param data
 * @returns {{type: string, payload: {accountId: *, data: *}}}
 */
export const updateApi = (accountId, data) => {
    return {
        type: ACTION_UPDATE_API,
        payload: {
            accountId: accountId,
            data: data
        }
    };
};