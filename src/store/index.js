import Vue from 'vue'
import Vuex from 'vuex'

import { getStorage, removeStorage, setStorage } from '@/util/storage'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 默认头像路径
    photo: getStorage('login_info').photo,
    // token
    token: getStorage('token'),
    // 持久化token
    refresh_token: getStorage('refresh_token'),
    // 登录 信息
    loginInfo: {}
  },
  getters: {},
  mutations: {
    // 修改头像
    EDIT_PHOTO (state, value) {
      state.photo = value
    },
    // 存token
    SET_TOKEN (state, value) {
      state.token = value
      setStorage('token', value)
    },
    // 持久化token
    SET_REFRESH_TOKEN (state, value) {
      state.refresh_token = value
      setStorage('refresh_token', value)
    },
    // 删除token
    REMOVE_TOKEN (state, value) {
      removeStorage(value)
    },
    // logo的登录信息
    GET_LOGIN_INFO (state, value) {
      state.loginInfo = value
      setStorage('login_info', value)
    }
  },
  actions: {},
  modules: {}
})
