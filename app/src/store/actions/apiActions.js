import { ACTION_SET_API_LIST, ACTION_ADD_API, ACTION_DELETE_API, ACTION_UPDATE_API } from './types';
import { setAccountLoaded } from './accountActions';
import { forIn } from 'lodash';
import { addErrorNotification, addSuccessNotification } from './notificationActions';
import {
    fetchApiList,
    createRestApi,
    deleteRestApi,
    updateRestApi,
    getRestApi,
} from "../../services/api/restApi";

/**
 * 
 * @param {*} accountId
 */
export const loadRestApiListRequest = (accountId) => {
    return dispatch => {
        return fetchApiList(accountId)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(message || 'Unable to load rest api list. Unknown error');

                    return ;
                }

                dispatch(setAccountLoaded(accountId));
                dispatch(setApiList(accountId, data.items));

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification(err.message));
            });
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
        return createRestApi(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to create REST API'));

                    return ;
                }

                dispatch(addApi(accountId, data));
                if (onSuccess) {
                    onSuccess(data);
                }
                dispatch(addSuccessNotification('A new REST API instance has been created'));

                return data;
            })
            .catch(err => {
                if (onError) {
                    onError(err);
                }

                dispatch(addErrorNotification('Unable to create REST API. ' + err.message));
            })
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
        return deleteRestApi(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to delete REST API'));

                    return ;
                }

                dispatch(removeApi(accountId, apiId));
                if (onSuccess) {
                    onSuccess(data);
                }
                dispatch(addSuccessNotification('The REST API instance has been deleted'));

                return data;
            })
            .catch(err => {
                if (onError) {
                    onError(err);
                }
                dispatch(addErrorNotification('Unable to delete REST API. ' + err.message));
            });
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

    return dispatch => {
        return updateRestApi(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to update REST API'));

                    return ;
                }

                dispatch(updateApi(accountId, data));
                if (onSuccess) {
                    onSuccess(data);
                }
                dispatch(addSuccessNotification('The REST API instance has been updated'));

                return data;
            })
            .catch(err => {
                if (onError) {
                    onError(err);
                }
                dispatch(addErrorNotification('Unable to update REST API. ' + err.message));
            });
       }
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

    return dispatch => {
        return getRestApi(accountId, params)
            .then(response => {
                const { success, message, data } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to get REST API'));

                    return ;
                }
                if (onSuccess) {
                    onSuccess(data);
                }

                return data;
            })
            .catch(err => {
                if (onError) {
                    onError(err);
                }
                dispatch(addErrorNotification('Unable to fetch REST API data. ' + err.message));
            });
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