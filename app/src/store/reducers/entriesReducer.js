import dotProp from "dot-prop-immutable";
import { ACTION_SET_RESOURCE_ENTRIES, ACTION_DELETE_RESOURCE } from '../actions/types';

/**
 *
 */
const defaultState = {
    entries: {},
};

/**
 *
 * 
 * @param {*} state
 * @param {*} action
 */
const entriesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_SET_RESOURCE_ENTRIES:

            return dotProp.set(state, `entries.${action.payload.apiId}`, action.payload.entries);

        case ACTION_DELETE_RESOURCE:
            const updatedList = state.entries[action.payload.apiId].filter(item => item.id !== action.payload.resourceId);

            return dotProp.set(state, `entries.${action.payload.apiId}`, updatedList);

        default:
            return state;
    }
};

export default entriesReducer;