/**
 * fans API接口封装
 */
import request from '@/util/request'

// 获取粉丝列表
export const getFansAPI = ({ page = 1, per_page = 20 }) =>
  request({
    url: '/v1_0/followers',
    method: 'GET',
    params: {
      page,
      per_page
    }
  })
