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
    SET_user(state, user) {
      state.user = user
    },
    SET_token(state, token) {
      state.token = token
    },
    SET_roles(state, roles) {
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
            commit('SET_user', data.data)
            commit('SET_token', data.token)
            set('user', JSON.stringify(data.data))
            set('token', data.token, false)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout({ token: state.token })
          .then(() => {
            commit('SET_user', {})
            commit('SET_token', false)
            commit('SET_roles', [])
            remove('token', false)
            clear()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    removeToken({ commit }) {
      return new Promise((resolve) => {
        commit('SET_user', {})
        commit('SET_token', false)
        commit('SET_roles', [])
        remove('token', false)
        clear()
        resolve()
      })
    },
    getRoles({ commit, state }) {
      return new Promise((resolve, reject) => {
        const { username } = state.user
        getRoles({ username, token: state.token })
          .then((response) => {
            const { data } = response
            commit('SET_roles', data.roles)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}
