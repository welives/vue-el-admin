import { getMenus } from '@/api/menu'
export default {
  namespaced: true,
  state: {
    navBar: {
      active: 0,
      list: [],
    },
  },
  mutations: {
    SET_NAVBAR(state, { key, value }) {
      state.navBar[key] = value
    },
    SET_SIDEACTIVE(state, value) {
      state.navBar.list[state.navBar.active].sideActive = value
    },
  },
  actions: {
    getMenus({ commit }, roles) {
      return new Promise((resolve, reject) => {
        getMenus({ roles })
          .then((response) => {
            const { data } = response
            commit('SET_NAVBAR', { key: 'list', value: data.list })
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}
