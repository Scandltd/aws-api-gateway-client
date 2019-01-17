import {
    ACTION_SET_RESOURCE_ENTRIES,
    ACTION_DELETE_RESOURCE,
    ACTION_ADD_RESOURCE,
    ACTION_PUT_HTTP_METHOD,
    ACTION_PUT_INTEGRATION,
    ACTION_PUT_RESPONSE,
    ACTION_DELETE_HTTP_METHOD,
    ACTION_SET_VPS_LINKS,
    ACTION_ENTRIES_LOADING_REST_API,
    ACTION_ENTRIES_SET_REST_API
} from './types';
import { addErrorNotification, addSuccessNotification } from './notificationActions';
import {
    fetchApiResources,
    deleteResource as deleteResourceRequest,
    createResource,
} from "../../services/api/resourceApi";
import { getVpcLinks } from "../../services/api/vpcApi";
import {
    createRestApiMethod,
    putIntegration as putIntegrationRequest,
    putMethodResponse,
    deleteMethod,
} from "../../services/api/methodApi";
import { getRestApi } from '../../services/api/restApi';

import IntegrationTypeEnum from '../../enum/integrationTypeEnum';
import ContentHandlingTypeEnum from "../../enum/contentHandlingTypeEnum";
import ServiceActionTypeEnum from "../../enum/serviceActionTypeEnum";

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
        return fetchApiResources(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to fetch resources data'));

                    return data;
                }

                dispatch(setEntriesResources(apiId, data.items));

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification('Unable to fetch resources data. ' + err.message));
            });
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
        return deleteResourceRequest(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to dete resource'));

                    return data;
                }

                dispatch(deleteResource(accountId, apiId, resourceId));
                dispatch(addSuccessNotification('Resource has been deleted'));

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification('Unable to delete resource. ' + err.message));
            });
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
        return createResource(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to create REST API resource'));

                    return data;
                }

                dispatch(addEntriesResource(accountId, restApiId, data));
                dispatch(addSuccessNotification('Resource has been created'));
                if (onSuccess) {
                    onSuccess(data);
                }

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification('Unable to create REST API resource. ' + err.message));
                if (onError) {
                    onError(err);
                }
            });
    };
};

/**
 *
 * @param accountId
 * @param onSuccess
 * @param onError
 *
 * @returns {Function}
 */
export const loadVpsLinksApiRequest = (accountId, onSuccess = null, onError = null) => {
    const params = {
        limit: 500,
        //position: 'STRING_VALUE'
    };

    return dispatch => {
        return getVpcLinks(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to fetch VPC links'));

                    return data;
                }

                dispatch(setVpsLinks(accountId, data.items));
                if (onSuccess) {
                    onSuccess(data);
                }

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification('Unable to load VPC links. ' + err.message));
                if (onError) {
                    onError(err);
                }
            });
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
        return createRestApiMethod(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || `Unable to create http method ${data.httpMethod}`));

                    return data;
                }

                dispatch(putHttpMethod(accountId, restApiId, resourceId, data));
                dispatch(addSuccessNotification(`Http method ${data.httpMethod} has been created`));
                if (onSuccess) {
                    onSuccess(data);
                }

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification(`Unable to create http method ${data.httpMethod}.  ${err.message}`));
                if (onError) {
                    onError(err);
                }
            });
    };
};

/**
 *
 * @param accountId
 * @param dataParams
 * @param onSuccess
 * @param onError
 *
 * @returns {Function}
 */
export const putMethodIntegrationApiRequest = (accountId, dataParams, onSuccess = null, onError = null) => {

    const params = {
        httpMethod: dataParams.constData.httpMethod, /* required */
        resourceId: dataParams.constData.resourceId, /* required */
        restApiId: dataParams.constData.restApiId,   /* required */
        type: null,                            /* required */
    };

    if (!dataParams.defaultTimeout) {
        params.timeoutInMillis = dataParams.customTimeout;
    }

    switch (dataParams.type) {
        case IntegrationTypeEnum.Mock:
            params.type = 'MOCK';
            break;

        case IntegrationTypeEnum.LambdaFunction:
            params.type = dataParams.lambdaProxyIntegration ? 'AWS_PROXY' : 'AWS';
            params.uri = `arn:aws:apigateway:${dataParams.lambdaFunctionRegion}:lambda:path/2015-03-31/functions/${dataParams.lambdaFunctionName}/invocations`;
            params.integrationHttpMethod = dataParams.constData.httpMethod;
            params.contentHandling = ContentHandlingTypeEnum.CONVERT_TO_TEXT;
            break;

        case IntegrationTypeEnum.HTTP:
            params.type = dataParams.httpProxyIntegration ? 'HTTP_PROXY' : 'HTTP';
            params.uri = dataParams.httpEndpointUrl;
            params.integrationHttpMethod = dataParams.httpMethod;
            if (ContentHandlingTypeEnum.PASSTHROUGH !== dataParams.httpContentHandling) {
                params.contentHandling = dataParams.httpContentHandling;
            }

            break;

        case IntegrationTypeEnum.AWSService:
            params.type = 'AWS';
            params.credentials = dataParams.serviceExecutionRole;
            params.integrationHttpMethod = dataParams.serviceHttpMethod;
            if (ContentHandlingTypeEnum.PASSTHROUGH !== dataParams.httpContentHandling) {
                params.contentHandling = dataParams.httpContentHandling;
            }

            let serviceName = dataParams.serviceSubdomain ? `${dataParams.serviceSubdomain}.${dataParams.serviceName}` : dataParams.serviceName;
            let pathAction = ServiceActionTypeEnum.PATH_OVERRIDE === dataParams.serviceActionType ? `path/${dataParams.serviceAction}` : `action/${dataParams.serviceAction}`;
            params.uri = `arn:aws:apigateway:${dataParams.serviceRegion}:${serviceName}:${pathAction}`;

            break;

        case IntegrationTypeEnum.VPCLink:
            params.type = dataParams.vpcProxyIntegration ? 'HTTP_PROXY' : 'HTTP';
            params.connectionId = dataParams.vpcConnectId;
            params.connectionType = 'VPC_LINK';
            params.uri = dataParams.vpcEndpointUrl;
            params.integrationHttpMethod = dataParams.vpcHttpMethod;

            break;

        default:
            break;
    }

    return dispatch => {
        return putIntegrationRequest(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to put method integration'));

                    return data;
                }

                dispatch(addSuccessNotification(`Integration for ${dataParams.constData.httpMethod} method has been applied`));
                dispatch(putIntegration(accountId, dataParams.constData.restApiId, dataParams.constData.resourceId, dataParams.constData.httpMethod, response));
                if (onSuccess) {
                    onSuccess(response);
                }
            })
            .catch(err => {
                dispatch(addErrorNotification(`Unable to put method integration.  ${err.message}`));
                if (onError) {
                    onError(err);
                }
            });
    };
};

/**
 *
 * @param accountId
 * @param dataParams
 * @param onSuccess
 * @param onError
 *
 * @returns {Function}
 */
export const putMethodResponseApiRequest = (accountId, dataParams, onSuccess = null, onError = null) => {
    const params = {
        httpMethod: dataParams.constData.httpMethod, /* required */
        resourceId: dataParams.constData.resourceId, /* required */
        restApiId: dataParams.constData.restApiId,   /* required */
        statusCode: String(dataParams.status),       /* required */
    };

    return dispatch => {
        return putMethodResponse(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to put method response'));

                    return data;
                }

                dispatch(addSuccessNotification(`Response parameters for ${dataParams.constData.httpMethod} method has been set`));
                dispatch(putResponse(accountId, dataParams.constData.restApiId, dataParams.constData.resourceId, dataParams.constData.httpMethod, response));
                if (onSuccess) {
                    onSuccess(data);
                }

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification(`Unable to put method response.  ${err.message}`));
                if (onError) {
                    onError(err);
                }
            });
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
        return deleteMethod(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || `Unable to delete ${httpMethod} method`));

                    return data;
                }

                dispatch(addSuccessNotification(`Http method ${httpMethod} has been deleted`));
                dispatch(deleteHttpMethod(accountId, restApiId, resourceId, httpMethod));
                if (onSuccess) {
                    onSuccess(data);
                }

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification(`Unable to delete ${httpMethod} method.  ${err.message}`));
                if (onError) {
                    onError(err);
                }
            });
    };
};

/**
 *
 * @param accountId
 * @param restApiId
 * @returns {function(*): Promise<T | never>}
 */
export const loadRestApi = (accountId, restApiId) => {
    const params = {
        restApiId: restApiId
    };

    return dispatch => {
        dispatch(setLoadingRestApi());

        return getRestApi(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to get REST API'));

                    return data;
                }

                dispatch(setRestApi(data));

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification('Unable to get REST API. ' + err.message));
                dispatch(setRestApi({}));
            });
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

/**
 *
 * @param accountId
 * @param entities
 *
 * @returns {{type: string, payload: {accountId: *, entities: *}}}
 */
export const setVpsLinks = (accountId, entities) => {
    return {
        type: ACTION_SET_VPS_LINKS,
        payload: {
            accountId,
            entities
        }
    };
};

/**
 *
 * @returns {{type: string}}
 */
export const setLoadingRestApi = () => {
    return {
        type: ACTION_ENTRIES_LOADING_REST_API,
    };
};

/**
 *
 * @param entity
 * @returns {{payload: {entity: *}, type: string}}
 */
export const setRestApi = (entity) => {
    return {
        type: ACTION_ENTRIES_SET_REST_API,
        payload: {
            entity,
        }
    };
};
