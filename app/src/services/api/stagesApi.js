import axios from "./axiosBase";

export function fetchStages(accountId, params) {
    return axios.post(`account/${accountId}/proxy/getStages`, params);
}
