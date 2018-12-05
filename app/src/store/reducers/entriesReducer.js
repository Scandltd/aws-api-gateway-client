import dotProp from "dot-prop-immutable";
import { ACTION_SET_RESOURCE_ENTRIES, ACTION_DELETE_RESOURCE, ACTION_ADD_RESOURCE } from '../actions/types';
import { forEach, concat, indexOf } from "lodash";

/**
 *
 */
const defaultState = {
    entries: {},
};

/**
 *
 * @param collection
 * @param id
 * @returns {Array}
 */
function getIdsRecursive(collection, id) {
    let result = [];
    forEach(collection, function(item) {
        if (item.parentId === id) {
            result = concat(result, getIdsRecursive(collection, item.id));
        }
    });
    result.push(id);

    return result;
}

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
            const removeIds = getIdsRecursive(state.entries[action.payload.apiId], action.payload.resourceId);
            const updatedList = state.entries[action.payload.apiId].filter(item => -1 === indexOf(removeIds, item.id));

            return dotProp.set(state, `entries.${action.payload.apiId}`, updatedList);

        case ACTION_ADD_RESOURCE:

            return dotProp.merge(state, `entries.${action.payload.apiId}`, [action.payload.entry]);

        default:
            return state;
    }
};

export default entriesReducer;