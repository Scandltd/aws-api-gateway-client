import axios from '../axiosBase';
import {
  setLoadingFalse,
  setLoadingTrue
} from '../../../store/actions/appParamsActions';

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
      if (error.response && error.response.data && error.response.data.message) {
        error.message = error.response.data.message;
      }

      return Promise.reject(error);
    });
  },
};
