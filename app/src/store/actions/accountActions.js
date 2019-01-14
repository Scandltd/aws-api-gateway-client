import {
    ACTION_SET_ACCOUNT_LIST,
    ACTION_SET_ACCOUNT_LOADED,
    ACTION_SET_AUTHENTICATE_REQUEST,
    ACTION_SET_AUTHENTICATE_REQUEST_DONE,
    ACTION_SET_ACCOUNT,
} from './types';
import AccountService from '../../services/accounts/AccountLoader';
import { addErrorNotification } from './notificationActions';
import AwsApiCredentials from '../../services/aws/AwsApiCredentials';

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
    const service = new AccountService();

    return dispatch => {
        dispatch(setAccounts(service.fetchAccounts()));
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
