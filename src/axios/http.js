import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import QS from 'qs';
import process from 'process';
import store from '@/store/index.js'

// 环境修改配置
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://www.baidu.com';
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = 'https://www.ceshi.com';
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://localhost:8080';
}

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

config => {
  const token = store.state.token
  token && (config.headers.Authorize = token) {
    return config
  }
}