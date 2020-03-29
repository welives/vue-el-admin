import { getMenus } from '@/api/menu'
import { get, set } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    navBar: {
      active: 0,
      list: JSON.parse(get('menus')) || [],
    },
    accessBtns: JSON.parse(get('btns')) || [],
  },
  mutations: {
    SET_navbar(state, { key, value }) {
      state.navBar[key] = value
    },
    SET_sideActive(state, value) {
      state.navBar.list[state.navBar.active].sideActive = value
    },
    SET_accessBtns(state, value) {
      state.accessBtns = value
    },
  },
  actions: {
    getMenus({ commit, rootState }, roles) {
      return new Promise((resolve, reject) => {
        getMenus({ roles, token: rootState.admin.token })
          .then((response) => {
            const { data } = response
            commit('SET_navbar', { key: 'list', value: data.list })
            set('menus', JSON.stringify(data.list))
            if (data.accessBtns) {
              commit('SET_accessBtns', data.accessBtns)
              set('btns', JSON.stringify(data.accessBtns))
            }
            resolve(data.list)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}
