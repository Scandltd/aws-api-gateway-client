import { ACTION_ADD_NOTIFICATION, ACTION_REMOVE_NOTIFICATION, ACTION_FLUSH_NOTIFICATION } from '../actions/types';

/**
 *
 */
const defaultState = {
    notifications: [],
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
const notificationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_ADD_NOTIFICATION:
            const notifications = state.notifications;
            notifications.push(action.payload);

            return {...state, notifications: notifications};

        case ACTION_REMOVE_NOTIFICATION:
            const updatedList = state.notifications.filter(item => item.id !== action.payload.id);

            return {...state, notifications: updatedList};

        case ACTION_FLUSH_NOTIFICATION:

            return {...state, notifications: []};

        default:
            return state;
    }
};

export default notificationReducer;