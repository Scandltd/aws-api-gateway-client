import {
    ACTION_SET_FILTER_VALUE,
    ACTION_SET_FILTERING_STATUS
} from './types';

/**
 *
 * @param qString
 *
 * @returns {{type: string, payload: {querySting: *}}}
 */
export function setFilterValue(qString) {
    return {
        type: ACTION_SET_FILTER_VALUE,
        payload: {
            qString,
        }
    };
}

/**
 *
 * @param isProcessed
 *
 * @returns {{type: string, payload: {isProcessed: boolean}}}
 */
export function setFilteringStatus(isProcessed = true) {
    return {
        type: ACTION_SET_FILTERING_STATUS,
        payload: {
            isProcessed,
        }
    };
}
