import { ACTION_SET_LOADING_TRUE, ACTION_SET_LOADING_FALSE, ACTION_SET_AWS_REGIONS_LIST } from './types';

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

/**
 *
 * @param data
 *
 * @returns {{type: string, payload: {data: *}}}
 */
export const setAwsRegionsList = (data) => {
    return {
        'type': ACTION_SET_AWS_REGIONS_LIST,
        payload: {
            data: data,
        }
    };
};
