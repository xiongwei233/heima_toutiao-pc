/**
 * 封装网络请求
 */
import axiosFn from 'axios'

const axios = axiosFn.create({
  baseURL: 'http://api-toutiao-web.itheima.net/mp/',
  timeout: 20000 // 20秒超时时间(请求20秒无响应，直接判断超时)
})

// 导出的是一个函数，函数里面有传参，传参写了默认值
export default ({
  url,
  method = 'GET',
  params = {},
  data = {},
  headers = {}
}) => {
  // 这里调用了axios函数，并把传参设置了进去 ,最后把结果返回给函数
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
