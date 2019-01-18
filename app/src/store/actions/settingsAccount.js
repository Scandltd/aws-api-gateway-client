import {
    ACTION_SETTINGS_ACCOUNT_LOAD_ACCOUNT,
    ACTION_SETTINGS_ACCOUNT_SET_ACCOUNT,
    ACTION_SETTINGS_ACCOUNT_PROCESSING,
    ACTION_SETTINGS_ACCOUNT_PROCESSING_DONE,
    ACTION_SETTINGS_ACCOUNT_SET_DEFAULT
} from "../actions/types";

import {
    createAccount as createAccountRequest,
    fetchAccount,
    putAccount,
} from "../../services/api/accountApi";
import { addErrorNotification } from "./notificationActions";
import { setAccount as setAccountToList } from "./accountActions";

/**
 * Create a new account
 *
 * @param data
 *
 * @returns {function(*): Promise<T>}
 */
export const createAccount = (data) => {
    return dispatch => {
        dispatch(setProcessing());

        return createAccountRequest(data)
            .then(res => {
                dispatch(setProcessingDone());
                const { data, success, message } = res.data;
                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to create account. Unknown error'));

                    return data;
                }

                dispatch(setAccountToList(data));

                return data;
            })
            .catch(err => {
                dispatch(setProcessingDone());
                dispatch(addErrorNotification(err.message));
                const response = err.response;
                if (response && response.status === 422 && response.data) {
                    return Promise.reject(response.data);
                }
            });
    };
};

/**
 *
 * @param id
 * @param data
 *
 * @returns {function(*): Promise<T>}
 */
export const updateAccount = (id, data) => {
    return dispatch => {
        dispatch(setProcessing());

        return putAccount(id, data)
            .then(res => {
                dispatch(setProcessingDone());
                const { data, success, message } = res.data;
                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to update account. Unknown error'));

                    return data;
                }

                //dispatch(updateAccount(data));

                return data;
            })
            .catch(err => {
                dispatch(setProcessingDone());
                dispatch(addErrorNotification(err.message));
                const response = err.response;
                if (response && response.status === 422 && response.data) {
                    return Promise.reject(response.data);
                }
            });
    };
};

/**
 * Delete an account
 *
 * @param id
 *
 * @returns {function(*): (Promise<T> | *)}
 */
export const loadAccount = (id) => {
    return dispatch => {
        dispatch(setLoadingAccount());

        return fetchAccount(id)
            .then(res => {
                const { data, success, message } = res.data;
                if (!success) {
                    dispatch(addErrorNotification(message || 'Unable to fetch account. Unknown error'));

                    return data;
                }

                dispatch(setAccount(data));

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification(err.message));
            });
    };
};

/**
 *
 * @returns {{type: string}}
 */
export function setLoadingAccount() {
    return {
        type: ACTION_SETTINGS_ACCOUNT_LOAD_ACCOUNT,
    }
}

/**
 *
 * @param account
 *
 * @returns {{type: string, payload: {account: *}}}
 */
export function setAccount(account) {
    return {
        type: ACTION_SETTINGS_ACCOUNT_SET_ACCOUNT,
        payload: {
            account,
        }
    }
}

/**
 *
 * @returns {{type: string}}
 */
export function setProcessing() {
    return {
        type: ACTION_SETTINGS_ACCOUNT_PROCESSING,
    }
}

/**
 *
 * @returns {{type: string}}
 */
export function setProcessingDone() {
    return {
        type: ACTION_SETTINGS_ACCOUNT_PROCESSING_DONE,
    }
}

/**
 *
 * @returns {{type: string}}
 */
export function setDefault() {
    return {
        type: ACTION_SETTINGS_ACCOUNT_SET_DEFAULT,
    };
}
