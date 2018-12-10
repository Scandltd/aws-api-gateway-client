import {
    ACTION_SET_RESOURCE_ENTRIES,
    ACTION_DELETE_RESOURCE,
    ACTION_ADD_RESOURCE,
    ACTION_PUT_HTTP_METHOD,
    ACTION_PUT_INTEGRATION,
    ACTION_PUT_RESPONSE,
    ACTION_DELETE_HTTP_METHOD
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
        authorizerId: data.authorizerId || null,
        requestParameters: {}
    };

    const regex = /{([\w._-]+)[+?]?}/gi;
    let matchStep;
    while ((matchStep = regex.exec(data.constData.path)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (matchStep.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (matchStep[1]) {
            params.requestParameters[`method.request.path.${matchStep[1]}`] = true;
        }
    }

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

    const params = {
        httpMethod: data.constData.httpMethod, /* required */
        resourceId: data.constData.resourceId, /* required */
        restApiId: data.constData.restApiId,   /* required */
        type: null,                            /* required */

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

    switch (data.type) {
        case IntegrationTypeEnum.Mock:
            params.type = 'MOCK';
            break;

        case IntegrationTypeEnum.LambdaFunction:
            params.type = data.lambdaProxyIntegration ? 'AWS_PROXY' : 'AWS';
            params.uri = `arn:aws:apigateway:${data.lambdaFunctionRegion}:lambda:path/2015-03-31/functions/${data.lambdaFunctionName}/invocations`;
            params.integrationHttpMethod = data.constData.httpMethod;
            break;

        default:
            break;
    }



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
export const putMethodResponseApiRequest = (accountId, data, onSuccess = null, onError = null) => {
    const params = {
        httpMethod: data.constData.httpMethod, /* required */
        resourceId: data.constData.resourceId, /* required */
        restApiId: data.constData.restApiId,   /* required */
        statusCode: String(data.status),       /* required */
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
 * @param restApiId
 * @param resourceId
 * @param httpMethod
 * @param onSuccess
 * @param onError
 *
 * @returns {Function}
 */
export const deleteMethodApiRequest = (accountId, restApiId, resourceId, httpMethod, onSuccess = null, onError = null) => {
    const params = {
        httpMethod: httpMethod,     /* required */
        resourceId: resourceId,     /* required */
        restApiId: restApiId        /* required */
    };

    return dispatch => {
        dispatch(apiCall(
            accountId,
            'deleteMethod',
            params,
            response => {
                dispatch(addSuccessNotification(`Http method ${httpMethod} has been deleted`));
                dispatch(deleteHttpMethod(accountId, restApiId, resourceId, httpMethod));
                if (onSuccess) {
                    onSuccess(response);
                }
            },
            err => {
                dispatch(addErrorNotification(`Unable to delete ${httpMethod} method.  ${err.message}`));
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

/**
 *
 * @param accountId
 * @param restApiId
 * @param resourceId
 * @param httpMethod
 *
 * @returns {{type: string, payload: {accountId: *, restApiId: *, resourceId: *, httpMethod: *}}}
 */
export const deleteHttpMethod = (accountId, restApiId, resourceId, httpMethod) => {
    return {
        type: ACTION_DELETE_HTTP_METHOD,
        payload: {
            accountId,
            restApiId,
            resourceId,
            httpMethod
        }
    };
};
