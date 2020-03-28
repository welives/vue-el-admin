import { getTypeList } from '@/api/shop/type'

export default {
  namespaced: true,
  state: {
    typeList: [],
  },
  mutations: {
    // 设置类型
    SET_typeList(state, value) {
      state.typeList = value
    },
    // 新增
    ADD_type(state, data) {
      state.typeList.unshift(data)
    },
    // 修改
    UPDATE_type(state, data) {
      const index = state.typeList.findIndex((v) => v.id === data.id)
      Object.assign(state.typeList[index], data)
    },
    // 更新状态
    UPDATE_status(state, data) {
      const index = state.typeList.findIndex((v) => v.id === data.row.id)
      state.typeList[index].status = data.row.status
    },
    // 删除单个
    DELETE_single(state, index) {
      state.typeList.splice(index, 1)
    },
    // 批量删除
    DELETE_batch(state, value) {
      state.typeList = value
    },
  },
  actions: {
    getTypeList({ commit, state, rootState }) {
      if (!state.typeList.length) {
        return new Promise((resolve, reject) => {
          getTypeList({ token: rootState.user.token })
            .then((response) => {
              const { data } = response
              commit('SET_typeList', data.typeList)
              resolve(data.typeList)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.typeList
      }
    },
  },
}
