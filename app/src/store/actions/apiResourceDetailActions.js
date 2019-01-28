import {
    ACTION_API_DETAIL_SET_FILTER_VALUE,
    ACTION_API_DETAIL_SET_DEFAULT_STATE
} from './types';

/**
 *
 * @param qString
 *
 * @returns {{type: string, payload: {querySting: *}}}
 */
export function setFilterValue(qString) {
    return {
        type: ACTION_API_DETAIL_SET_FILTER_VALUE,
        payload: {
            qString,
        }
    };
}

/**
 *
 * @returns {{type: string}}
 */
export function setDefaultState() {
    return {
        type: ACTION_API_DETAIL_SET_DEFAULT_STATE,
    };
}
