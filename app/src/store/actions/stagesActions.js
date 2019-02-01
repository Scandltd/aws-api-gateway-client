import {
    ACTION_STAGES_SET_LOADING,
    ACTION_STAGES_SET_STAGES,
    ACTION_STAGES_SET_DEFAULT,
} from './types';
import { fetchStages } from "../../services/api/stagesApi";
import { addErrorNotification } from "./notificationActions";

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
