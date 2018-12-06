import {
    ACTION_SET_RESOURCE_ENTRIES,
    ACTION_DELETE_RESOURCE,
    ACTION_ADD_RESOURCE,
    ACTION_PUT_HTTP_METHOD,
    ACTION_PUT_INTEGRATION,
    ACTION_PUT_RESPONSE
} from './types';
import { apiCall } from './apiActions';
import { addErrorNotification, addSuccessNotification } from './notificationActions';
import IntegrationTypeEnum from '../../enum/integrationTypeEnum';

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
        restApiId: restApiId             /* required */
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
 * @param restApiId
 * @param resourceId
 * @param data
 * @param onSuccess
 * @param onError
 *
 * @returns {Function}
 */
export const createMethodApiRequest = (accountId, restApiId, resourceId, data, onSuccess = null, onError = null) => {
    const params = {
        authorizationType: 'NONE',      /* required */
        httpMethod: data.httpMethod,    /* required */
        resourceId: resourceId,         /* required */
        restApiId: restApiId,           /* required */
        //apiKeyRequired: true || false,
        //authorizationScopes: [
        //    'STRING_VALUE',
        //    /* more items */
        //],
        authorizerId: data.authorizerId || null,
        //operationName: 'STRING_VALUE',
        //requestModels: {
        //    '<String>': 'STRING_VALUE',
        //    /* '<String>': ... */
        //},
        //requestParameters: {
        //    '<String>': true || false,
            /* '<String>': ... */
        //},
        //requestValidatorId: 'STRING_VALUE'
    };

    return dispatch => {
        dispatch(apiCall(
            accountId,
            'createRestApiMethod',
            params,
            response => {
                dispatch(putHttpMethod(accountId, restApiId, resourceId, response));
                dispatch(addSuccessNotification(`Http method ${response.httpMethod} has been created`));
                if (onSuccess) {
                    onSuccess(response);
                }
            },
            err => {
                dispatch(addErrorNotification(`Unable to create http method ${data.httpMethod}.  ${err.message}`));
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
 * @param data
 * @param onSuccess
 * @param onError
 *
 * @returns {Function}
 */
export const putMethodIntegrationApiRequest = (accountId, data, onSuccess = null, onError = null) => {

    let type = null;
    switch (data.type) {
        case IntegrationTypeEnum.Mock:
            type = 'MOCK';
            break;

        default:
            type = data.type;
            break;
    }

    const params = {
        httpMethod: data.constData.httpMethod, /* required */
        resourceId: data.constData.resourceId, /* required */
        restApiId: data.constData.restApiId,   /* required */
        type: type,                       /* required */

        /*
        cacheKeyParameters: [
            'STRING_VALUE',
        ],
        cacheNamespace: 'STRING_VALUE',
        connectionId: 'STRING_VALUE',
        connectionType: INTERNET | VPC_LINK,
        contentHandling: CONVERT_TO_BINARY | CONVERT_TO_TEXT,
        credentials: 'STRING_VALUE',
        integrationHttpMethod: 'STRING_VALUE',
        passthroughBehavior: 'STRING_VALUE',
        requestParameters: {
            '<String>': 'STRING_VALUE',
        },
        requestTemplates: {
            '<String>': 'STRING_VALUE',
        },
        timeoutInMillis: 0,
        uri: 'STRING_VALUE'
        */
    };

    return dispatch => {
        dispatch(apiCall(
            accountId,
            'putIntegration',
            params,
            response => {
                dispatch(addSuccessNotification(`Integration for ${data.constData.httpMethod} method has been applied`));
                dispatch(putIntegration(accountId, data.constData.restApiId, data.constData.resourceId, data.constData.httpMethod, response));
                if (onSuccess) {
                    onSuccess(response);
                }
            },
            err => {
                dispatch(addErrorNotification(`Unable to put method integration.  ${err.message}`));
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
 * @param data
 * @param onSuccess
 * @param onError
 *
 * @returns {Function}
 */
export const putMethodResponseApirequest = (accountId, data, onSuccess = null, onError = null) => {
    const params = {
        httpMethod: data.constData.httpMethod, /* required */
        resourceId: data.constData.resourceId, /* required */
        restApiId: data.constData.restApiId,   /* required */
        statusCode: data.status,                /* required */
    };

    return dispatch => {
        dispatch(apiCall(
            accountId,
            'putMethodResponse',
            params,
            response => {
                dispatch(addSuccessNotification(`Response parameters for ${data.constData.httpMethod} method has been set`));
                dispatch(putResponse(accountId, data.constData.restApiId, data.constData.resourceId, data.constData.httpMethod, response));
                if (onSuccess) {
                    onSuccess(response);
                }
            },
            err => {
                dispatch(addErrorNotification(`Unable to put method response.  ${err.message}`));
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

/**
 *
 * @param accountId
 * @param apiId
 * @param resourceId
 * @param entity
 *
 * @returns {{type: string, payload: {accountId: *, apiId: *, resourceId: *, entity: *}}}
 */
export const putHttpMethod = (accountId, apiId, resourceId, entity) => {
    return {
        type: ACTION_PUT_HTTP_METHOD,
        payload: {
            accountId,
            apiId,
            resourceId,
            entity
        }
    };
};

/**
 *
 * @param accountId
 * @param restApiId
 * @param resourceId
 * @param httpMethod
 * @param entity
 *
 * @returns {{type: string, payload: {accountId: *, restApiId: *, resourceId: *, httpMethod: *, entity: *}}}
 */
export const putIntegration = (accountId, restApiId, resourceId, httpMethod, entity) => {
    return {
        type: ACTION_PUT_INTEGRATION,
        payload: {
            accountId,
            restApiId,
            resourceId,
            httpMethod,
            entity
        }
    };
};

/**
 *
 * @param accountId
 * @param restApiId
 * @param resourceId
 * @param httpMethod
 * @param entity
 *
 * @returns {{type: string, payload: {accountId: *, restApiId: *, resourceId: *, httpMethod: *, entity: *}}}
 */
export const putResponse = (accountId, restApiId, resourceId, httpMethod, entity) => {
    return {
        type: ACTION_PUT_RESPONSE,
        payload: {
            accountId,
            restApiId,
            resourceId,
            httpMethod,
            entity
        }
    };
};
