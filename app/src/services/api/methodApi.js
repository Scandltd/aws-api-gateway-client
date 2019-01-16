import axios from './axiosBase';

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function createRestApiMethod(accountId, params) {
    return axios.post(`account/${accountId}/proxy/putMethod`, params);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function putIntegration(accountId, params) {
    return axios.post(`account/${accountId}/proxy/putIntegration`, params);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function putMethodResponse(accountId, params) {
    return axios.post(`account/${accountId}/proxy/putMethodResponse`, params);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function deleteMethod(accountId, params) {
    return axios.post(`account/${accountId}/proxy/deleteMethod`, params);
}