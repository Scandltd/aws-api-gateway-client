import {
    ACTION_STAGES_SET_LOADING,
    ACTION_STAGES_SET_STAGES,
    ACTION_STAGES_SET_DEFAULT,
    ACTION_STAGES_DELETE_REQUEST_LOADING,
    ACTION_STAGES_DELETE_STAGE,
} from './types';
import { fetchStages, removeStage } from "../../services/api/stagesApi";
import { addErrorNotification, addSuccessNotification } from "./notificationActions";

/**
 *
 * @param accountId
 * @param restApiId
 *
 * @returns {function(*): (Promise<T> | *)}
 */
export function loadStages(accountId, restApiId) {
    const params = {
        restApiId: restApiId,
    };

    return dispatch => {
        dispatch(setStagingLoading(true));

        return fetchStages(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    throw new Error(message || 'Unable to load rest api list. Unknown error');
                }
                dispatch(setStages(data.item || []));

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification(err.message));
                dispatch(setStagingLoading(false));
            });
    };
}

/**
 *
 * @param accountId
 * @param restApiId
 * @param stageName
 *
 * @returns {function(*): Promise<T>}
 */
export function deleteStage(accountId, restApiId, stageName) {
    const params = {
        restApiId: restApiId, /* required */
        stageName: stageName  /* required */
    };

    return dispatch => {
        dispatch(setDeleteRequestLoading(true));

        return removeStage(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    throw new Error(message || `Unable to delete stage ${stageName}. Unknown error`);
                }

                dispatch(addSuccessNotification(`The stage ${stageName} has been deleted`));
                dispatch(setDeleteStage(accountId, restApiId, stageName));

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification(err.message));
                dispatch(setDeleteRequestLoading(false));
            });
    };
}

/**
 *
 * @param loading
 *
 * @returns {{type: string, payload: {loading: boolean}}}
 */
export function setStagingLoading(loading = true) {
    return {
        type: ACTION_STAGES_SET_LOADING,
        payload: {
            loading,
        }
    };
}

/**
 *
 * @param stages
 *
 * @returns {{type: string, payload: {restApiId: *, stages: *}}}
 */
export function setStages(stages) {
    return {
        type: ACTION_STAGES_SET_STAGES,
        payload: {
            stages,
        }
    };
}

/**
 *
 * @returns {{type: string}}
 */
export function setDefault() {
    return {
        type: ACTION_STAGES_SET_DEFAULT,
    };
}

/**
 *
 * @param loading
 *
 * @returns {{type: string, payload: {loading: boolean}}}
 */
export function setDeleteRequestLoading(loading = true) {
    return {
        type: ACTION_STAGES_DELETE_REQUEST_LOADING,
        payload: {
            loading,
        }
    };
}

/**
 *
 * @param accountId
 * @param restApi
 * @param stageName
 *
 * @returns {{type: string, payload: {accountId: *, restApi: *, stageName: *}}}
 */
export function setDeleteStage(accountId, restApi, stageName) {
    return {
        type: ACTION_STAGES_DELETE_STAGE,
        payload: {
            accountId,
            restApi,
            stageName,
        }
    };
}