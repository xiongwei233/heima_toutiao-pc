/**
 * articles API接口封装
 */
import request from '@/util/request'

import { getStorage } from '@/util/storage'
// 获取所有频道列表
export const getChannelsAPI = () =>
  request({
    url: '/v1_0/channels',
    method: 'GET'
  })

// 获取文章列表
export const getArticlesListAPI = ({
  status,
  channel_id,
  begin_pubdate,
  end_pubdate,
  page = 1,
  per_page = 10
}) =>
  request({
    url: '/v1_0/articles',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getStorage('token')}`
    },
    params: {
      status,
      channel_id,
      begin_pubdate,
      end_pubdate,
      page,
      per_page
    }
  })

// 删除文章
export const deleteArticleAPI = ({ articleId }) =>
  request({
    url: `/v1_0/articles/${articleId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getStorage('token')}`
    }
  })
