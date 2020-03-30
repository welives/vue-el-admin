import { getLevelList } from '@/api/user/level'

export default {
  namespaced: true,
  state: {
    levelList: [],
  },
  mutations: {
    SET_levelList(state, value) {
      state.levelList = value
    },
    // 新增
    ADD_level(state, data) {
      state.levelList.push(data)
    },
    // 修改
    UPDATE_level(state, data) {
      const index = state.levelList.findIndex((v) => v.id === data.id)
      Object.assign(state.levelList[index], data)
    },
    // 更新状态
    UPDATE_status(state, data) {
      const index = state.levelList.findIndex((v) => v.id === data.row.id)
      state.levelList[index].status = data.row.status
    },
    // 删除单个
    DELETE_single(state, index) {
      state.userList.splice(index, 1)
    },
  },
  actions: {
    getLevelList({ commit, state, rootState }) {
      if (!state.levelList.length) {
        return new Promise((resolve, reject) => {
          getLevelList({ token: rootState.admin.token })
            .then((response) => {
              const { data } = response
              commit('SET_levelList', data.levelList)
              resolve(data.levelList)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.levelList
      }
    },
  },
}
