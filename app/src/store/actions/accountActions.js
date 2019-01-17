import {
    ACTION_SET_ACCOUNT_LIST,
    ACTION_SET_ACCOUNT_LOADED,
    ACTION_SET_ACCOUNT,
    ACTION_SET_LOADING_ACCOUNT_LIST,
    ACTION_REMOVE_ACCOUNT,
} from './types';
import { addErrorNotification } from './notificationActions';
import {
    deleteAccount as deleteAccountRequest,
    fetchAccounts,
} from '../../services/api/accountApi';

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

/**
 *
 * @returns {{type: string}}
 */
export const setLoadingAccount = () => {
    return {
        type: ACTION_SET_LOADING_ACCOUNT_LIST,
    };
};

/**
 *
 * @param accountId
 *
 * @returns {{type: string, payload: {accountId: *}}}
 */
export const removeAccount = (accountId) => {
    return {
        type: ACTION_REMOVE_ACCOUNT,
        payload: {
            accountId,
        }
    };
};

/**
 * Delete an account
 *
 * @param id
 *
 * @returns {function(*): (Promise<T> | *)}
 */
export const deleteAccount = (id) => {
    return dispatch => {
        dispatch(setLoadingAccount());

        return deleteAccountRequest(id)
            .then(res => {
                const { data, success, message } = res.data;
                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to delete account. Unknown error'));

                    return data;
                }

                dispatch(removeAccount(id));
            })
            .catch(err => {
                dispatch(addErrorNotification(err.message));
            });
    };
};