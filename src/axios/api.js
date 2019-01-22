import axios from 'axios';
import config from './config.js';
import qs from 'qs';
import Cookies from 'js-cookie';
import router from '../router/index.js';

export default function $axios(options) {
  return new Promise((reslove, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      transformResponse: [function(data) {}]
    });
    // request拦截器
    instance.interceptors.request.use(
      config => {
        let token = Cookies.get('markToken');
        if (token) {
          config.headers.accessToken = token;
        } else {
          // 重定向页面
          router.push('./page1');
        }
        // 3.根据请求方法，序列化传来的参数
        if (config.method === 'post') {
          if (
            config.data._proto_ === FormData.prototype ||
            config.url.endsWith('path') ||
            config.url.endsWith('mark') ||
            config.url.endsWith('patchs')
            // eslint-disable-next-line no-empty
          ) {
          } else {
            config.data = qs.stringify(config.data);
          }
        }
        return config;
      },
      error => {
        // eslint-disable-next-line no-console
        console.log('request', error);
        // 判断请求超时
        if (
          error.code === 'ECONNABORTED' &&
          error.message.indexOf('timeout') !== -1
        ) {
          // eslint-disable-next-line no-console
          console.log('请求超时');
        }
        const errorInfo = error.response;
        // eslint-disable-next-line no-console
        console.log(errorInfo);
        if (errorInfo) {
          const errorStatus = errorInfo.status;
          router.push({
            path: `/error/${errorStatus}`
          });
        }
      }
    );
    // reqonse拦截器
    instance.interceptors.response.use(
        response => {
            let data;
            if (response.data === undefined) {
                data
            }
        }
    )
  });
}
