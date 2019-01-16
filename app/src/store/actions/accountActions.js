import {
    ACTION_SET_ACCOUNT_LIST,
    ACTION_SET_ACCOUNT_LOADED,
    ACTION_SET_AUTHENTICATE_REQUEST,
    ACTION_SET_AUTHENTICATE_REQUEST_DONE,
    ACTION_SET_ACCOUNT,
    ACTION_SET_LOADING_ACCOUNT_LIST,
} from './types';
import { addErrorNotification } from './notificationActions';
import AwsApiCredentials from '../../services/aws/AwsApiCredentials';
import { fetchAccounts } from '../../services/api/account';

/**
 * connect a account using user credentials
 *
 * @param data
 *
 * @returns {function(*): (Promise<T> | *)}
 */
export const connectAccountRequest = (data) => {
    return dispatch => {
        dispatch(setAuthRequest());

        return AwsApiCredentials.authenticate(data)
            .then((response) => {
                setAccount(response);
            })
            .catch((err) => {
                dispatch(setAuthRequestDone());
                dispatch(addErrorNotification(err.message));
            });
    };
};

/**
 * load account settings
 */
export const loadAccountList = () => {
    return dispatch => {
        dispatch(setLoadingAccount());

        return fetchAccounts()
            .then(res => {
                const { data, success } = res.data;
                if (!success) {
                    dispatch(addErrorNotification('Unable to get accounts. Unknown error'));
                    return ;
                }

                dispatch(setAccounts(data));
            })
            .catch(err => {
                dispatch(addErrorNotification(err.message));
            });
    };
};

/**
 * 
 * @param {*} accounts 
 */
export const setAccounts = (accounts) => {
    return {
        type: ACTION_SET_ACCOUNT_LIST,
        payload: accounts
    };
};

/**
 * 
 * @param {*} accountId 
 */
export const setAccountLoaded = (accountId) => {
    return {
        type: ACTION_SET_ACCOUNT_LOADED,
        payload: {
            accountId: accountId
        }
    };
};

/**
 *
 * @returns {{type: string}}
 */
export const setAuthRequest = () => {
    return {
        type: ACTION_SET_AUTHENTICATE_REQUEST,
    };
};

/**
 *
 * @returns {{type: string}}
 */
export const setAuthRequestDone = () => {
    return {
        type: ACTION_SET_AUTHENTICATE_REQUEST_DONE,
    };
};

/**
 *
 * @param account
 * @returns {{type: string, payload: {account: *}}}
 */
export const setAccount = (account) => {
    return {
        type: ACTION_SET_ACCOUNT,
        payload: {
            account,
        }
    };
};

export const setLoadingAccount = () => {
    return {
        type: ACTION_SET_LOADING_ACCOUNT_LIST,
    };
};
