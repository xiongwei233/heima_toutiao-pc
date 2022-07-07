/**
 * home API接口封装
 */
import request from '@/util/request'

export const channelsAPI = () =>
  request({
    url: '/v1_0/channels',
    method: 'GET'
  })
