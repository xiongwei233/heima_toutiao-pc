/**
 * comments API接口封装
 */
import request from '@/util/request'

// 获取所有频道列表
export const editCommentsAPI = ({ article_id, allow_comment }) =>
  request({
    url: '/v1_0/comments/status',
    method: 'PUT',
    params: {
      article_id
    },
    data: {
      allow_comment
    }
  })
