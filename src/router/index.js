import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Layout'),

    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home')
      },
      {
        path: '/articles',
        name: 'Articles',
        component: () =>
          import(/* webpackChunkName: "articles" */ '@/views/Articles')
      },
      {
        path: '/images',
        name: 'Images',
        component: () =>
          import(/* webpackChunkName: "images" */ '@/views/Images')
      },
      {
        path: '/publish',
        name: 'Publish',
        component: () =>
          import(/* webpackChunkName: "publish" */ '@/views/Publish')
      },
      {
        path: '/comment',
        name: 'Comment',
        component: () =>
          import(/* webpackChunkName: "publish" */ '@/views/Comment')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 证明有token-已经登录了
    next() // 跳转到home
  } else {
    // 如果进的不是login页面 判断是否有token
    if (store.state.token === null) {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
