import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// reset重置
import 'normalize.css'

// 全局样式
import '@/styles/global.scss'

// element
import '@/ui/element'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
