import axios from "./axiosBase";

/**
 *
 * @param accountId
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function getLambdaFunctions(accountId) {
    return axios.get(`account/${accountId}/list/lambda_function`);
}
