import { getRoleList } from '@/api/setting/manager'

export default {
  namespaced: true,
  state: {
    roleList: [],
  },
  mutations: {
    SET_roleList(state, value) {
      state.roleList = value
    },
    ADD_role(state, data) {
      state.roleList.push(data)
    },
    // 修改
    UPDATE_role(state, data) {
      const index = state.roleList.findIndex((v) => v.id === data.id)
      Object.assign(state.roleList[index], data)
    },
    // 更新状态
    UPDATE_status(state, data) {
      const index = state.roleList.findIndex((v) => v.id === data.row.id)
      state.roleList[index].status = data.row.status
    },
    DELETE_single(state, index) {
      state.roleList.splice(index, 1)
    },
  },
  actions: {
    getRoleList({ commit, state, rootState }) {
      if (!state.roleList.length) {
        return new Promise((resolve, reject) => {
          getRoleList({ token: rootState.admin.token })
            .then((response) => {
              const { data } = response
              commit('SET_roleList', data.roleList)
              resolve(data.roleList)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.roleList
      }
    },
  },
}
