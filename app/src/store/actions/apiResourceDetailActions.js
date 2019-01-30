import {
    ACTION_API_DETAIL_SET_FILTER_VALUE,
    ACTION_API_DETAIL_SET_DEFAULT_STATE,
} from './types';

/**
 *
 * @param qString
 * @param httpMethod
 *
 * @returns {{type: string, payload: {qString: *, httpMethod: *}}}
 */
export function setFilterValue(qString = '', httpMethod = '') {
    return {
        type: ACTION_API_DETAIL_SET_FILTER_VALUE,
        payload: {
            qString,
            httpMethod,
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
