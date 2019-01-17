import {
    ACTION_SETTINGS_ACCOUNT_LOAD_ACCOUNT,
    ACTION_SETTINGS_ACCOUNT_SET_ACCOUNT,
    ACTION_SETTINGS_ACCOUNT_PROCESSING,
    ACTION_SETTINGS_ACCOUNT_PROCESSING_DONE
} from "../actions/types";

/**
 *
 */
const defaultState = {
    account: {},
    accounts: {},
    loading: false,
    processing: false,
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const settingsAccount = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_SETTINGS_ACCOUNT_LOAD_ACCOUNT:
            return {
                ...state,
                account: {},
                loading: true
            };

        case ACTION_SETTINGS_ACCOUNT_SET_ACCOUNT:
            return {
                ...state,
                loading: false,
                account: action.payload.account
            };

        case ACTION_SETTINGS_ACCOUNT_PROCESSING:
            return {
                ...state,
                processing: true,
            };

        case ACTION_SETTINGS_ACCOUNT_PROCESSING_DONE:
            return {
                ...state,
                processing: false,
            };

        default:
            return state;
    }
};

export default settingsAccount;
