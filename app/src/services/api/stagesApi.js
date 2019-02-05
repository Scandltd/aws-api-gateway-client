import axios from "./axiosBase";

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function fetchStages(accountId, params) {
    return axios.post(`account/${accountId}/proxy/getStages`, params);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function removeStage(accountId, params) {
    return axios.post(`account/${accountId}/proxy/deleteStage`, params);
}

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function getStage(accountId, params) {
    return axios.post(`account/${accountId}/proxy/getStage`, params);
}
