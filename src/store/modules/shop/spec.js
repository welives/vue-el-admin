import { getSpec } from '@/api/shop/spec'

export default {
  namespaced: true,
  state: {
    spec: [],
  },
  mutations: {
    // 设置规格
    SET_spec(state, value) {
      state.spec = value
    },
    // 新增规格
    ADD_spec(state, data) {
      state.spec.unshift(data)
    },
    // 修改规格
    UPDATE_spec(state, data) {
      const index = state.spec.findIndex((v) => v.id === data.id)
      Object.assign(state.spec[index], data)
    },
    // 更新规格状态
    UPDATE_status(state, data) {
      const index = state.spec.findIndex((v) => v.id === data.row.id)
      state.spec[index].status = data.row.status
    },
    // 删除单个规格
    DELETE_single(state, index) {
      state.spec.splice(index, 1)
    },
    // 批量删除规格
    DELETE_batch(state, value) {
      state.spec = value
    },
  },
  actions: {
    // 获取规格
    getSpec({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        getSpec({ token: rootState.user.token })
          .then((response) => {
            const { data } = response
            commit('SET_spec', data.spec)
            resolve(data)
          })
          .catch((error) => reject(error))
      })
    },
  },
}
