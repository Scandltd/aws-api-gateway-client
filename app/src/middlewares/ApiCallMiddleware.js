import { ACTION_AWS_API_CALL } from '../store/actions/types';
import { find } from 'lodash';
import AwsApiGateway from "../services/aws/AwsApiGateway";
import { setLoadingTrue, setLoadingFalse } from '../store/actions/appParamsActions';

/**
 *
 */
const ApiCallMiddleware = ({dispatch, getState}) => next => action => {
    if (ACTION_AWS_API_CALL !== action.type) {
        return next(action);
    }

    const state = getState();
    const account = find(state.account.accounts, {id: action.payload.accountId});
    if (!account) {
        console.error('api call middleware. Account not found', action.payload.accountId);
        //@todo add error!
    }

    const client = new AwsApiGateway(account.credentials.accessKeyId, account.credentials.secretAccessKey, account.credentials.region);

    dispatch(setLoadingTrue());
    const response = client[action.payload.method](action.payload.data);

    response
        .then(response => {
            dispatch(setLoadingFalse());

            return response;
        })
        .catch(err => {
            dispatch(setLoadingFalse());
            if (typeof action.payload.onError === "function") {
                action.payload.onError(err);
            }
        })
    ;

    if (typeof action.payload.onSuccess === "function") {
        response.then(action.payload.onSuccess);
    }


    return next(action);
};

export default ApiCallMiddleware;
