import dotProp from "dot-prop-immutable";
import { ACTION_SET_RESOURCE_ENTRIES } from '../actions/types';

/**
 *
 */
const defaultState = {
    entries: {},
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const entriesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_SET_RESOURCE_ENTRIES:

            return dotProp.set(state, `entries.${action.payload.apiId}`, action.payload.entries);

        default:
            return state;
    }
};

export default entriesReducer;