import axios from './axiosBase';

/**
 *
 * @param accountId
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function fetchApiList(accountId) {
    return axios.post(`account/${accountId}/proxy/getRestApis`);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function createRestApi(accountId, params) {
    return axios.post(`account/${accountId}/proxy/createRestApi`, params);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function deleteRestApi(accountId, params) {
    return axios.post(`account/${accountId}/proxy/deleteRestApi`, params);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function updateRestApi(accountId, params) {
    return axios.post(`account/${accountId}/proxy/updateRestApi`, params);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function getRestApi(accountId, params) {
    return axios.post(`account/${accountId}/proxy/getRestApi`, params);
}
