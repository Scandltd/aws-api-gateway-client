import { ACTION_ADD_NOTIFICATION, ACTION_REMOVE_NOTIFICATION, ACTION_FLUSH_NOTIFICATION } from './types';
import uuidv4 from 'uuid/v4';

/**
 *
 * @param message
 *
 * @returns {{type: string, payload: {variant: *, message: *}}}
 */
export const addWarningNotification = (message) => {
    return addNotification('warning', message);
};

/**
 *
 * @param message
 *
 * @returns {{type: string, payload: {variant: *, message: *}}}
 */
export const addErrorNotification = (message) => {
    return addNotification('error', message);
};

/**
 *
 * @param message
 *
 * @returns {{type: string, payload: {variant: *, message: *}}}
 */
export const addSuccessNotification = (message) => {
    return addNotification('success', message);
};

/**
 *
 * @param message
 *
 * @returns {{type: string, payload: {variant: *, message: *}}}
 */
export const addInfoMessage = (message) => {
    return addNotification('info', message);
};

/**
 *
 * @param variant
 * @param message
 *
 * @returns {{type: string, payload: {variant: *, message: *}}}
 */
export const addNotification = (variant, message) => {
    return {
        type: ACTION_ADD_NOTIFICATION,
        payload: {
            variant: variant,
            message: message,
            id: uuidv4()
        }
    }
};

/**
 *
 * @param messageId
 *
 * @returns {{type: string, payload: {messageId: *}}}
 */
export const removeNotification = (messageId) => {
    return {
        type: ACTION_REMOVE_NOTIFICATION,
        payload: {
            id: messageId
        }
    }
};

/**
 *
 * @returns {{type: string, payload: {messageId: *}}}
 */
export const flushNotification = () => {
    return {
        type: ACTION_FLUSH_NOTIFICATION,
        payload: {}
    };
};
