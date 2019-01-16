import axios from './axiosBase';

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function fetchApiResources(accountId, params) {
    return axios.post(`account/${accountId}/proxy/getResources`, params);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function deleteResource(accountId, params) {
    return axios.post(`account/${accountId}/proxy/deleteResource`, params);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function createResource(accountId, params) {
    return axios.post(`account/${accountId}/proxy/createResource`, params);
}
