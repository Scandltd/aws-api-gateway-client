import axios from "./axiosBase";

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function createDeployment(accountId, params) {
    return axios.post(`account/${accountId}/proxy/createDeployment`, params);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function fetchDeployments(accountId, params) {
    return axios.post(`account/${accountId}/proxy/getDeployments`, params);
}
