import axios from './axiosBase';

/**
 *
 * @returns {*}
 */
export function fetchAccounts() {
    return axios.get('/account');
}

/**
 *
 * @param data
 *
 * @returns {*|AxiosPromise<any>|void}
 */
export function createAccount(data) {
    return axios.post('/account', data);
}

/**
 *
 * @param id
 *
 * @returns {*}
 */
export function deleteAccount(id) {
    return axios.delete(`/account/${id}`);
}

/**
 *
 * @param id
 *
 * @returns {*}
 */
export function fetchAccount(id) {
    return axios.get(`/account/${id}`);
}

/**
 *
 * @param id
 * @param data
 *
 * @returns {*}
 */
export function putAccount(id, data) {
    return axios.put(`/account/${id}`, data);
}