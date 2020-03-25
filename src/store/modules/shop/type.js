import { getType } from '@/api/shop/type'

export default {
  namespaced: true,
  state: {
    type: [],
  },
  mutations: {
    // 设置类型
    SET_type(state, value) {
      state.type = value
    },
    // 新增
    ADD_type(state, data) {
      state.type.unshift(data)
    },
    // 修改
    UPDATE_type(state, data) {
      const index = state.type.findIndex((v) => v.id === data.id)
      Object.assign(state.type[index], data)
    },
    // 更新状态
    UPDATE_status(state, data) {
      const index = state.type.findIndex((v) => v.id === data.row.id)
      state.type[index].status = data.row.status
    },
    // 删除单个
    DELETE_single(state, index) {
      state.type.splice(index, 1)
    },
    // 批量删除
    DELETE_batch(state, value) {
      state.type = value
    },
  },
  actions: {
    getType({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        getType({ token: rootState.user.token })
          .then((response) => {
            const { data } = response
            commit('SET_type', data.type)
            resolve(data)
          })
          .catch((error) => reject(error))
      })
    },
  },
}
