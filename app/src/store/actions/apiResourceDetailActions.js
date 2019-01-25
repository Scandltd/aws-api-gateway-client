import {
    ACTION_SET_FILTER_VALUE,
    ACTION_SET_FILTERING_STATUS
} from './types';

/**
 *
 * @param querySting
 *
 * @returns {{type: string, payload: {querySting: *}}}
 */
export function setFilterValue(querySting) {
    return {
        type: ACTION_SET_FILTER_VALUE,
        payload: {
            querySting,
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
