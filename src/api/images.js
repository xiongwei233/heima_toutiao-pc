/**
 * images API接口封装
 */
import request from '@/util/request'

// 获取图片
export const getImagesAPI = ({ collect, page, per_page }) =>
  request({
    url: '/v1_0/user/images',
    method: 'GET',
    params: {
      collect,
      page,
      per_page
    }
  })

// 收藏-图片素材
export const collectImagesAPI = ({ imageId, collect }) =>
  request({
    url: `/v1_0/user/images/${imageId}`,
    method: 'PUT',
    data: {
      collect
    }
  })

// 删除-图片素材
export const deleteImagesAPI = ({ imageId }) =>
  request({
    url: `/v1_0/user/images/${imageId}`,
    method: 'DELETE'
  })
