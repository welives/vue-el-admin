import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import goods from './modules/goods'
import admin from './modules/admin'
import menu from './modules/menu'
import image from './modules/image'
import category from './modules/shop/category'
import spec from './modules/shop/spec'
import type from './modules/shop/type'
import comment from './modules/shop/comment'
import users from './modules/user/index'
import level from './modules/user/level'
import order from './modules/order/index'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    admin,
    menu,
    goods,
    image,
    category,
    spec,
    type,
    comment,
    users,
    level,
    order,
  },
})
