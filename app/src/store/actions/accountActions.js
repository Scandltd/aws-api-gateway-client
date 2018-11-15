import {ACTION_SET_ACCOUNT_LIST, ACTION_SET_ACCOUNT_LOADED} from './types';
import AccountService from '../../services/accounts/AccountLoader';

/**
 * load account settings
 */
export const loadAccountList = () => {
    const service = new AccountService();

    return dispatch => {
        dispatch(setAccounts(service.fecthAccounts()));
    };
}

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
