import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import goods from './modules/goods'
import user from './modules/user'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    menu,
    goods,
  },
})
