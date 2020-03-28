import { getSpecList } from '@/api/shop/spec'

export default {
  namespaced: true,
  state: {
    specList: [],
  },
  mutations: {
    // 设置规格
    SET_specList(state, value) {
      state.specList = value
    },
    // 新增规格
    ADD_spec(state, data) {
      state.specList.unshift(data)
    },
    // 修改规格
    UPDATE_spec(state, data) {
      const index = state.specList.findIndex((v) => v.id === data.id)
      Object.assign(state.specList[index], data)
    },
    // 更新规格状态
    UPDATE_status(state, data) {
      const index = state.specList.findIndex((v) => v.id === data.row.id)
      state.specList[index].status = data.row.status
    },
    // 删除单个规格
    DELETE_single(state, index) {
      state.specList.splice(index, 1)
    },
    // 批量删除规格
    DELETE_batch(state, value) {
      state.specList = value
    },
  },
  actions: {
    // 获取规格
    getSpecList({ commit, state, rootState }) {
      if (!state.specList.length) {
        return new Promise((resolve, reject) => {
          getSpecList({ token: rootState.user.token })
            .then((response) => {
              const { data } = response
              commit('SET_specList', data.specList)
              resolve(data.specList)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.specList
      }
    },
  },
}
