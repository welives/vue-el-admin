import { login, logout, getRoles } from '@/api/login'
import { get, set, remove, clear } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    user: JSON.parse(get('user')) || {},
    token: get('token', false) || false,
    roles: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    },
  },
  actions: {
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password })
          .then((response) => {
            const { data } = response
            commit('SET_USER', data.data)
            commit('SET_TOKEN', data.token)
            set('user', JSON.stringify(data.data))
            set('token', data.token, false)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_USER', {})
            commit('SET_TOKEN', false)
            commit('SET_ROLES', [])
            remove('token', false)
            clear()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getRoles({ commit, state }) {
      return new Promise((resolve, reject) => {
        const { username } = state.user
        getRoles({ username })
          .then((response) => {
            const { data } = response
            commit('SET_ROLES', data.roles)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}
