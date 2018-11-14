import ApiGateway from '../../services/aws/AwsApiGateway';
import {ACTION_SET_RESOURCE_ENTRIES} from './types';

/**
 * @param apiId
 * @param credentials
 *
 * @returns {Function}
 */
export const loadResorces = (apiId, credentials) => {
    var params = {
        restApiId: apiId, /* required */
        embed: ['methods'],
        limit: 500,
        //position: 0               //@todo realize paginate or load all entries
    };

    let client = new ApiGateway(credentials.accessKeyId, credentials.secretAccessKey, credentials.region);

    return dispatch => {
        client.fetchApiResorces(params)
            .then((response) => {
                dispatch(setEntriesResources(apiId, response.items));
            })
            .catch((err) => {
                console.log('load_resources_action_err', err);
            });
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
