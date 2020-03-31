import { getAdminList } from '@/api/setting/manager'

export default {
  namespaced: true,
  state: {
    adminList: [],
  },
  mutations: {
    SET_adminList(state, value) {
      state.adminList = value
    },
    ADD_admin(state, data) {
      state.adminList.push(data)
    },
    // 修改
    UPDATE_admin(state, data) {
      const index = state.adminList.findIndex((v) => v.id === data.id)
      Object.assign(state.adminList[index], data)
    },
    // 更新状态
    UPDATE_status(state, data) {
      const index = state.adminList.findIndex((v) => v.id === data.row.id)
      state.adminList[index].status = data.row.status
    },
    DELETE_single(state, index) {
      state.adminList.splice(index, 1)
    },
  },
  actions: {
    getAdminList({ commit, state, rootState }) {
      if (!state.adminList.length) {
        return new Promise((resolve, reject) => {
          getAdminList({ token: rootState.admin.token })
            .then((response) => {
              const { data } = response
              commit('SET_adminList', data.adminList)
              resolve(data.adminList)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.adminList
      }
    },
  },
}
