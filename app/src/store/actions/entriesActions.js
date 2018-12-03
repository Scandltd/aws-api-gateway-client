import { ACTION_SET_RESOURCE_ENTRIES, ACTION_DELETE_RESOURCE } from './types';
import { apiCall } from './apiActions';
import { addErrorNotification } from './notificationActions';

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
