/**
 * stettings API接口封装
 */
import request from '@/util/request'

// 获取获取用户个人资料
export const getUserInfoAPI = () =>
  request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })

// 修改用户信息
export const editUserInfoAPI = ({ name, intro, email }) =>
  request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      intro,
      email
    }
  })
// 获修改用户头像
export const editPhotoAPI = (photo) =>
  request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: photo
  })
