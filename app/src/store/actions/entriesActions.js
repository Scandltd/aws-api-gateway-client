import { ACTION_SET_RESOURCE_ENTRIES, ACTION_DELETE_RESOURCE, ACTION_ADD_RESOURCE } from './types';
import { apiCall } from './apiActions';
import { addErrorNotification, addSuccessNotification } from './notificationActions';

/**
 *
 * @param accountId
 * @param apiId
 *
 * @returns {Function}
 */
export const loadResources = (accountId, apiId) => {
    const params = {
        restApiId: apiId, /* required */
        embed: ['methods'],
        limit: 500,
        //position: 0               //@todo realize paginate or load all entries
    };

    return dispatch => {
        dispatch(apiCall(
            accountId,
            'fetchApiResources',
            params,
            response => {
                dispatch(setEntriesResources(apiId, response.items));
            },
            err => {
                dispatch(addErrorNotification('Unable to fetch resources data. ' + err.message));
            }
        ));
    };
};

/**
 *
 * @param accountId
 * @param apiId
 * @param resourceId
 *
 * @returns {Function}
 */
export const deleteResourceApiRequest = (accountId, apiId, resourceId) => {
    const params = {
        resourceId: resourceId, /* required */
        restApiId: apiId /* required */
    };

    return dispatch => {
        dispatch(apiCall(
            accountId,
            'deleteResource',
            params,
            response => {
                dispatch(deleteResource(accountId, apiId, resourceId));
                dispatch(addSuccessNotification('Resource has been deleted'));
            },
            err => {
                dispatch(addErrorNotification('Unable to fetch resources data. ' + err.message));
            }
        ));
    };
};

/**
 *
 * @param accountId
 * @param restApiId
 * @param data
 * @param onSuccess
 * @param onError
 *
 * @returns {Function}
 */
export const createResourceApiRequest = (accountId, restApiId, data, onSuccess = null, onError = null) => {
    const params = {
        parentId: data.parentId || null, /* required */
        pathPart: data.path || null,     /* required */
        restApiId: restApiId            /* required */
    };

    return dispatch => {
        dispatch(apiCall(
            accountId,
            'createRestApiResource',
            params,
            response => {
                dispatch(addEntriesResource(accountId, restApiId, response));
                dispatch(addSuccessNotification('Resource has been created'));
                if (onSuccess) {
                    onSuccess(response);
                }
            },
            err => {
                dispatch(addErrorNotification('Unable to create REST API resource. ' + err.message));
                if (onError) {
                    onError(err);
                }
            }
        ));
    };
};

/**
 *
 * @param accountId
 * @param apiId
 * @param resourceId
 *
 * @returns {{type: string, payload: {accountId: *, apiId: *, resourceId: *}}}
 */
export const deleteResource = (accountId, apiId, resourceId) => {
    return {
        type: ACTION_DELETE_RESOURCE,
        payload: {
            accountId: accountId,
            apiId: apiId,
            resourceId: resourceId,
        }
    };
};

/**
 *
 * @param apiId
 * @param entries
 * @returns {{type: string, payload: {apiId: *, entries: *}}}
 */
export const setEntriesResources = (apiId, entries) => {
    return {
        type: ACTION_SET_RESOURCE_ENTRIES,
        payload: {
            apiId: apiId,
            entries: entries
        }
    };
};

/**
 *
 * @param accountId
 * @param apiId
 * @param entry
 *
 * @returns {{type: string, payload: {apiId: *, entry: *}}}
 */
export const addEntriesResource = (accountId, apiId, entry) => {
    return {
        type: ACTION_ADD_RESOURCE,
        payload: {
            accountId: accountId,
            apiId: apiId,
            entry: entry
        }
    };
};
