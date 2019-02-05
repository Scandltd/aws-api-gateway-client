import {
    ACTION_STAGE_DETAIL_LOADING_STAGE,
    ACTION_STAGE_DETAIL_SET_STAGE,
    ACTION_STAGE_DETAIL_SET_DEFAULT,
    ACTION_STAGE_DETAIL_LOADING_DEPLOYMENTS,
    ACTION_STAGE_DETAIL_DEPLOYMENTS_SET,
    ACTION_STAGE_DETAIL_DEPLOYMENTS_ADD,
} from './types';
import {
    getStage,
} from '../../services/api/stagesApi';
import {
    fetchDeployments,
} from '../../services/api/deploymentApi';
import { addErrorNotification } from "./notificationActions";

/**
 *
 * @param accountId
 * @param restApiId
 * @param stageName
 *
 * @returns {function(*): Promise<T>}
 */
export function loadStage(accountId, restApiId, stageName) {
    const params = {
        restApiId, /* required */
        stageName /* required */
    };

    return dispatch => {
        dispatch(setLoadingStage(true));

        return getStage(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    throw new Error(message || `Unable to fetch stage ${stageName}. Unknown error`);
                }

                dispatch(setStage(data));

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification(err.message));
                dispatch(setLoadingStage(false));
            });
    }
}

/**
 *
 * @param accountId
 * @param restApiId
 * @param position
 *
 * @returns {function(*): Promise<T>}
 */
export function loadDeployments(accountId, restApiId, position) {
    const params = {
        restApiId, /* required */
        limit: 500,
        position,
    };

    return dispatch => {
        dispatch(setLoadingDeployments(true));

        return fetchDeployments(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    throw new Error(message || `Unable to fetch deployments for stage ${data.stageName}. Unknown error`);
                }

                if (position) {
                    dispatch(addDeployments(data.items, data.position))
                } else {
                    dispatch(setDeployments(data.items, data.position));
                }

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification(err.message));
                dispatch(setLoadingDeployments(false));
            });
    }
}

/**
 *
 * @param loading
 *
 * @returns {{type: string, payload: {loading: boolean}}}
 */
export function setLoadingStage(loading = true) {
    return {
        type: ACTION_STAGE_DETAIL_LOADING_STAGE,
        payload: {
            loading
        }
    };
}

/**
 *
 * @param stage
 *
 * @returns {{type: string, payload: {stage: *}}}
 */
export function setStage(stage) {
    return {
        type: ACTION_STAGE_DETAIL_SET_STAGE,
        payload: {
            stage,
        }
    };
}

/**
 *
 * @returns {{type: string}}
 */
export function setDefault() {
    return {
        type: ACTION_STAGE_DETAIL_SET_DEFAULT,
    };
}

/**
 *
 * @param loading
 *
 * @returns {{type: string, payload: {loading: boolean}}}
 */
export function setLoadingDeployments(loading = true) {
    return {
        type: ACTION_STAGE_DETAIL_LOADING_DEPLOYMENTS,
        payload: {
            loading,
        },
    };
}

/**
 *
 * @param deployments
 * @param position
 *
 * @returns {{type: string, payload: {deployments: Array, position: *}}}
 */
export function setDeployments(deployments = [], position = null) {
    return {
        type: ACTION_STAGE_DETAIL_DEPLOYMENTS_SET,
        payload: {
            deployments,
            position,
        },
    };
}

/**
 *
 * @param deployments
 * @param position
 *
 * @returns {{type: string, payload: {deployments: Array, position: *}}}
 */
export function addDeployments(deployments = [], position = null) {
    return {
        type: ACTION_STAGE_DETAIL_DEPLOYMENTS_ADD,
        payload: {
            deployments,
            position,
        },
    };
}
