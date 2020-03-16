import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { getToken } from '@/utils/auth'

Vue.use(VueRouter)

/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error)
}

const router = new VueRouter({ mode: 'history', routes })

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // const token = sessionStorage.getItem('token')
  const token = getToken()
  if (token) {
    // 已登录
    if (to.name === 'login') {
      Vue.prototype.$message.error('请不要重复登录')
      return next(from.name ? from.name : 'index')
    }
    next()
  } else {
    // 未登录
    if (to.name === 'login') {
      return next()
    }
    Vue.prototype.$message.error('请先登录')
    next('login')
  }
})

export default router
