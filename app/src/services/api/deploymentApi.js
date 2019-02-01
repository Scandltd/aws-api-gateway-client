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
