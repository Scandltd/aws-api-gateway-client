import { createDeployment } from '../../services/api/deploymentApi';
import { addErrorNotification, addSuccessNotification } from "./notificationActions";
import { ACTION_DEPLOYMENT_CREATE_LOADING } from './types';

/**
 *
 * @param accountId
 * @param restApiId
 * @param data
 *
 * @returns {function(*): Promise<T>}
 */
export function createDeploymentRequest(accountId, restApiId, data) {
    const params = {
        restApiId: restApiId,               /* required */
        stageName: data.stageName,          /* required */
        description: data.description,
        stageDescription: data.stageDescription,
    };

    return dispatch => {
        dispatch(setCreateLoading(true));

        return createDeployment(accountId, params)
            .then(response => {
                const { success, data, message } = response.data;

                if (!success) {
                    throw new Error(message || 'Unable to load rest api list. Unknown error');
                }
                dispatch(setCreateLoading(false));
                dispatch(addSuccessNotification('Deployment has been created'));

                return data;
            })
            .catch(err => {
                dispatch(addErrorNotification(err.message));
                dispatch(setCreateLoading(false));

                const response = err.response;
                if (response && response.status === 422 && response.data) {
                    return Promise.reject(response.data);
                }
            });
    };
}

/**
 *
 * @param loading
 *
 * @returns {{type: string, payload: {loading: boolean}}}
 */
export function setCreateLoading(loading = true) {
    return {
        type: ACTION_DEPLOYMENT_CREATE_LOADING,
        payload: {
            loading,
        }
    };
}
