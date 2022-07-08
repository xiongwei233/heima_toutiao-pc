/**
 * 封装网络请求
 */
import router from '@/router'
import store from '@/store'
import axiosFn from 'axios'
import JSONbig from 'json-bigint'

const axios = axiosFn.create({
  baseURL: 'http://api-toutiao-web.itheima.net/mp/',
  // baseURL: 'http://ttapi.research.itcast.cn/mp/',
  timeout: 20000, // 20秒超时时间(请求20秒无响应，直接判断超时)

  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [
    function (data) {
      // Do whatever you want to transform the data
      // console.log(data)

      // 后端返回的数据可能不是 JSON 格式字符串
      // 如果不是的话，那么 JSONbig.parse 调用就会报错
      // 所以我们使用 try-catch 来捕获异常，处理异常的发生
      try {
        // 如果转换成功，则直接把结果返回
        return JSONbig.parse(data)
      } catch (err) {
        console.log('转换失败', err)
        // 如果转换失败了，则进入这里
        // 我们在这里把数据原封不动的直接返回给请求使用
        return data
      }

      // axios 默认在内部使用 JSON.parse 来转换处理原始数据
      // return JSON.parse(data)
    }
  ]
})

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 如果getToken有值并且发送请求的的请求头为空，
    // 判断本地有token再携带，判断具体api/index.js里 如果没有携带Authorization,我再添加上去
    // ?. 可选链操作符，如果前面对象里没有1ength，整个表达式原地返回undefined
    if (
      store.state.token?.length > 0 &&
      config.headers.Authorization === undefined
    ) {
      // 统一携带token
      config.headers.Authorization = `Bearer ${store.state.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 如果当前报错或者返回的状态码为401
    console.log(error)
    if (error.response && error.response.status === 401) {
      // 跳转到login
      router.push('/login')
      // 清除本地存储中的token
      store.state.commit('REMOVE_TOKEN', 'token')
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

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
