import axios from 'axios';

// 创建 axios 实例
let http = axios.create({
  timeout: 6000
});

// 设置 post、get 默认 content-type
http.defaults.headers.post['Content-Type'] = 'application/json';
http.defaults.headers.put['Content-Type'] = 'application/json';

// 添加请求拦截
http.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'put') {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截
http.interceptors.response.use(
  response => {
    let { data } = response;
    return data;
  },
  error => {
    let info = {};
    let { status, statusText, data } = error.response;
    if (!error.response) {
      info = {
        code: 5000,
        msg: 'Network Error'
      };
    } else {
      info = {
        code: status,
        data: data,
        msg: statusText
      };
    }
    return Promise.reject(info);
  }
);

export default function() {
  return http;
}
