import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import VueDND from 'awe-dnd'
import Cookie from 'js-cookie'
import Mock from '../mock'
import $conf from '@/common/config/config.js'
import './permission'

Vue.use(VueDND)

Object.defineProperties(Vue.prototype, {
  $cookie: {
    get() {
      return Cookie
    },
  },
  $mock: {
    get() {
      return Mock
    },
  },
  $conf: {
    get() {
      return $conf
    },
  },
})

// 引入全局配置文件
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
