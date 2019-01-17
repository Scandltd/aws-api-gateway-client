import axios from './api/axiosBase';
import { setLoadingFalse, setLoadingTrue } from '../store/actions/appParamsActions';



export default {
  setupInterceptors: (store, history) => {

    axios.interceptors.request.use((config) => {
      store.dispatch(setLoadingTrue());

      return config;
    }, (error) => {
      store.dispatch(setLoadingFalse());

      return Promise.reject(error);
    });


    axios.interceptors.response.use(response => {
      store.dispatch(setLoadingFalse());

      return response;
    }, error => {
      store.dispatch(setLoadingFalse());

      return Promise.reject(error);
    });

  },
};