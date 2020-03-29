import { getUserList } from '@/api/user/index'

export default {
  namespaced: true,
  state: {
    userList: [],
  },
  mutations: {
    SET_userList(state, value) {
      state.userList = value
    },
    // 新增
    ADD_user(state, data) {
      state.userList.unshift(data)
    },
    // 更新状态
    UPDATE_status(state, data) {
      const index = state.userList.findIndex((v) => v.id === data.row.id)
      state.userList[index].status = data.row.status
    },
    // 修改
    UPDATE_user(state, data) {
      const index = state.userList.findIndex((v) => v.id === data.id)
      Object.assign(state.userList[index], data)
    },
    // 删除单个会员
    DELETE_single(state, index) {
      state.userList.splice(index, 1)
    },
  },
  actions: {
    getUserList({ commit, state, rootState }) {
      if (!state.userList.length) {
        return new Promise((resolve, reject) => {
          getUserList({ token: rootState.admin.token })
            .then((response) => {
              const { data } = response
              commit('SET_userList', data.userList)
              resolve(data.userList)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.userList
      }
    },
  },
}
