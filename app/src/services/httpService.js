import loading from './api/interceptors/loading';

export default {
  setupInterceptors: (store, history) => {
    loading.setupInterceptors(store, history)
  },
};
