export default {
  namespaced: true,
  state: {
    user: {},
    token: false
  },
  mutations: {
    initUser(state) {
      const user = sessionStorage.getItem('user')
      if (user) {
        state.user = JSON.parse(user)
        state.token = state.user.token
      }
    },
    // 登录
    login(state, user) {
      state.user = user
      state.token = user.token
      sessionStorage.setItem('user', JSON.stringify(state.user))
      sessionStorage.setItem('token', JSON.stringify(state.token))
    },
    logout(state) {
      state.user = {}
      state.token = false
      sessionStorage.clear()
    }
  },
  actions: {}
}
