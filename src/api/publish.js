/**
 * stettings API接口封装
 */
import request from '@/util/request'

// 发表文章（新建）
export const addArticlesAPI = ({ draft, title, content, cover, channel_id }) =>
  request({
    url: 'v1_0/articles',
    method: 'POST',
    params: {
      draft
    },
    data: {
      title,
      content,
      cover,
      channel_id
    }
  })
