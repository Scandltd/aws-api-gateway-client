import {ACTION_SET_API_LIST} from './types';
import ApiGateway from '../../services/aws/AwsApiGateway';
import {setAccountLoaded} from './accountActions';

/**
 * 
 * @param {*} accountId 
 * @param {*} credentials 
 */
export const loadApiList = (accountId, credentials) => {
        
    let client = new ApiGateway(credentials.accessKeyId, credentials.secretAccessKey, credentials.region);

    return dispatch => {
        client.getApiList()
            .then((response) => {
                dispatch(setAccountLoaded(accountId));
                dispatch(setApiList(accountId, response.items));
            })
            .catch((err) => {
                console.log('api_action_err', err);
            });
    };
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