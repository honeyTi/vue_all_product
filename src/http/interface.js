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

export const getMapChart = (prov, timeEnd) => {
  return axios({
    url: `/area/getMapData?prov=${prov}&timeEnd=${timeEnd}`,
    method: 'get'
  })
};

export const intotal = (type, timeStart, timeEnd) => {
  return axios({
    url: `/index/GetCharts?types=${type}&timeStart=${timeStart}&timeEnd=${timeEnd}`,
    method: 'get'
  })
}

export const getProv = (types, prov, timeEnd) => {
  return axios({
    url: `/area/getProvData?types=${types}&prov=${prov}&timeEnd=${timeEnd}`,
    method: 'get'
  })
}

export const getCountyData = (prov, countyType, timeEnd) => {
  return axios({
    url: `/area/getCountyData?prov=${prov}&countyType=${countyType}&timeEnd=${timeEnd}`,
    method: 'get'
  })
}

// 默认全部导出
export default {
  getCharts,
  getMapChart,
  intotal,
  getProv,
  getCountyData
};
