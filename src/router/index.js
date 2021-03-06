import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error)
}

const router = new VueRouter({ mode: 'history', routes })

export default router
