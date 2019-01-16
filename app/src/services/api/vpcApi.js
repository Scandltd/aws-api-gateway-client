import axios from "./axiosBase";

/**
 *
 * @param accountId
 * @param params
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function getVpcLinks(accountId, params) {
    return axios.post(`account/${accountId}/proxy/getVpcLinks`, params);
}
