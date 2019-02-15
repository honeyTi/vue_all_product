import axios from './api';

let instance = axios();
export default {
  get(url, params, headers) {
    let options = {};
    if (params) {
      options.prames = params;
    }
    if (headers) {
      options.headers = headers;
    }
    return instance.get(url, options);
  },
  post(url, params, headers) {
    let options = {};
    if (headers) {
      options.headers = headers;
    }
    return instance.post(url, params, options);
  }
};
