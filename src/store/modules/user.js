import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    user: {},
    token: getToken(),
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
  },
  actions: {
    initUser({ commit }) {
      const user = sessionStorage.getItem('user')
      const token = getToken()
      if (user) {
        commit('SET_USER', JSON.parse(user))
      }
      if (token) {
        commit('SET_TOKEN', token)
      }
    },
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password })
          .then((response) => {
            const { data } = response
            commit('SET_USER', data.data)
            commit('SET_TOKEN', data.token)
            setToken(data.token)
            sessionStorage.setItem('user', JSON.stringify(data.data))
            // sessionStorage.setItem('token', data.token)
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
            removeToken()
            sessionStorage.removeItem('user')
            // sessionStorage.clear()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}
