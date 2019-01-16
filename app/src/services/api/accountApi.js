import axios from './axiosBase';

export function fetchAccounts() {
    return axios.get('/account');
}
