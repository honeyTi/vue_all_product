export default {
  method: 'get',
  // 基础url
  baseURL: 'http://localhost:8089',
  // 请求头设置
  headers: {
    'Content-Type': 'application/json;chartset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  widthCredentials: true,
  // 返回数据类型
  responseType: 'json'
};
