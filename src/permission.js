import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import { get } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = get('token', false)
  if (hasToken) {
    // 已登录
    if (to.name === 'login') {
      Message.error('请不要重复登录')
      next(from.name ? from.name : '/')
      NProgress.done()
    } else {
      const hasRoles =
        store.state.user.roles && store.state.user.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        // 刷新页面和通过链接直接访问的情况下需要重新验权
        const { roles } = await store
          .dispatch('user/getRoles')
          .catch((error) => {
            Promise.reject(error)
          })
        const accessRoutes = await store
          .dispatch('menu/getMenus', roles)
          .catch((error) => {
            Promise.reject(error)
          })
        // 页面验权
        if (to.name !== '404') {
          let access = false
          accessRoutes.list.some((item) => {
            item.sideMenu.some((v) => {
              if (to.name === v.name) {
                access = true
              }
            })
          })
          if (access) {
            next()
          } else {
            Message.error('你没有权限')
            next(from.name ? from.name : '/')
          }
        } else {
          next()
        }
      }
      NProgress.done()
    }
  } else {
    // 未登录
    if (to.name === 'login') {
      return next()
    }
    Message.error('请先登录')
    next('login')
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
