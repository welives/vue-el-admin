import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    user: JSON.parse(getToken('user')) || {},
    token: getToken('token') || false,
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
    // initUser({ commit }) {
    //   const user = getToken('user')
    //   const token = getToken('token')
    //   if (user) {
    //     commit('SET_USER', JSON.parse(user))
    //   }
    //   if (token) {
    //     commit('SET_TOKEN', token)
    //   }
    // },
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password })
          .then((response) => {
            const { data } = response
            commit('SET_USER', data.data)
            commit('SET_TOKEN', data.token)
            setToken('user', JSON.stringify(data.data))
            setToken('token', data.token)
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
            removeToken('user')
            removeToken('token')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}
