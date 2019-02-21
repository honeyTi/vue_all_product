import axios from './api';

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */
export const getCharts = (type, date1, date2) => {
  return axios({
    url: `/index/GetCharts?types=${type}&timeStart=${date1}&timeEnd=${date2}`,
    method: 'get'
  });
};

export const list = id => {
  return axios({
    url: `/list${id}`,
    method: 'get'
  });
};

export const upload = data => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  });
};

// 默认全部导出
export default {
  getCharts,
  list,
  upload
};
