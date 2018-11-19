import { ACTION_SET_LOADING_TRUE, ACTION_SET_LOADING_FALSE } from './types';

/**
 *
 * @returns {{type: string, payload: {}}}
 */
export const setLoadingTrue = () => {
    return {
        'type': ACTION_SET_LOADING_TRUE,
        'payload': {}
    };
};

/**
 *
 * @returns {{type: string, payload: {}}}
 */
export const setLoadingFalse = () => {
    return {
        'type': ACTION_SET_LOADING_FALSE,
        'payload': {}
    };
};
