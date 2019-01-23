import dotProp from "dot-prop-immutable";
import {
    ACTION_SET_RESOURCE_ENTRIES,
    ACTION_DELETE_RESOURCE,
    ACTION_ADD_RESOURCE,
    ACTION_PUT_HTTP_METHOD,
    ACTION_PUT_INTEGRATION,
    ACTION_PUT_RESPONSE,
    ACTION_DELETE_HTTP_METHOD,
    ACTION_SET_VPS_LINKS,
    ACTION_ENTRIES_SET_REST_API,
    ACTION_ENTRIES_LOADING_REST_API,
} from '../actions/types';
import { forEach, concat, indexOf, findIndex, get } from "lodash";

/**
 *
 */
const defaultState = {
    entries: {},
    vpcLinks: {},
    restApi: {},
    loadingRestApi: false,
};

/**
 *
 * @param collection
 * @param id
 * @returns {Array}
 */
function getIdsRecursive(collection, id) {
    let result = [];
    forEach(collection, function(item) {
        if (item.parentId === id) {
            result = concat(result, getIdsRecursive(collection, item.id));
        }
    });
    result.push(id);

    return result;
}

/**
 *
 * 
 * @param {*} state
 * @param {*} action
 */
const entriesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_SET_RESOURCE_ENTRIES:

            return dotProp.set(state, `entries.${action.payload.apiId}`, action.payload.entries);

        case ACTION_DELETE_RESOURCE:
            const removeIds = getIdsRecursive(state.entries[action.payload.apiId], action.payload.resourceId);
            const updatedList = state.entries[action.payload.apiId].filter(item => -1 === indexOf(removeIds, item.id));

            return dotProp.set(state, `entries.${action.payload.apiId}`, updatedList);

        case ACTION_ADD_RESOURCE:

            return dotProp.merge(state, `entries.${action.payload.apiId}`, [action.payload.entry]);


        case ACTION_PUT_HTTP_METHOD: {
            const resourceIndex = findIndex(dotProp.get(state, `entries.${action.payload.apiId}`), {id: action.payload.resourceId});

            if (-1 === resourceIndex) {
                return state;
            }

            const methods = dotProp.get(state, `entries.${action.payload.apiId}.${resourceIndex}.resourceMethods`, {});
            methods[action.payload.entity.httpMethod] = action.payload.entity;

            return dotProp.set(state, `entries.${action.payload.apiId}.${resourceIndex}.resourceMethods`, methods);
        }

        case ACTION_PUT_RESPONSE: {
            const resourceIndex = findIndex(dotProp.get(state, `entries.${action.payload.restApiId}`), {id: action.payload.resourceId});
            const httpMethod = dotProp.get(state, `entries.${action.payload.restApiId}.${resourceIndex}.resourceMethods.${action.payload.httpMethod}`);
            const responseData = get(action.payload, 'entity.data.data');

            if (!httpMethod || !responseData) {
                return state;
            }
            
            if (!httpMethod.methodResponses) {
                httpMethod.methodResponses = {
                    [responseData.statusCode]: responseData
                };
            } else {
                httpMethod.methodResponses[responseData.statusCode] = responseData;
            }

            return dotProp.set(state, `entries.${action.payload.restApiId}.${resourceIndex}.resourceMethods.${action.payload.httpMethod}`, httpMethod);
        }

        case ACTION_PUT_INTEGRATION: {
            const resourceIndex = findIndex(dotProp.get(state, `entries.${action.payload.restApiId}`), {id: action.payload.resourceId});
            const httpMethod = dotProp.get(state, `entries.${action.payload.restApiId}.${resourceIndex}.resourceMethods.${action.payload.httpMethod}`);
            if (!httpMethod) {
                return state;
            }
            httpMethod.methodIntegration = get(action.payload, 'entity.data.data');

            return dotProp.set(state, `entries.${action.payload.restApiId}.${resourceIndex}.resourceMethods.${action.payload.httpMethod}`, httpMethod);
        }

        case ACTION_DELETE_HTTP_METHOD: {
            const resourceIndex = findIndex(dotProp.get(state, `entries.${action.payload.restApiId}`), {id: action.payload.resourceId});

            if (-1 === resourceIndex) {
                return state;
            }

            return dotProp.delete(state, `entries.${action.payload.restApiId}.${resourceIndex}.resourceMethods.${action.payload.httpMethod}`);
        }

        case ACTION_SET_VPS_LINKS:

            return dotProp.set(state, `vpcLinks.${action.payload.accountId}`, action.payload.entities);

        case ACTION_ENTRIES_SET_REST_API:

            return {
                ...state,
                restApi: action.payload.entity,
                loadingRestApi: false
            };

        case ACTION_ENTRIES_LOADING_REST_API:
            return {
                ...state,
                loadingRestApi: true
            };

        default:
            return state;
    }
};

export default entriesReducer;