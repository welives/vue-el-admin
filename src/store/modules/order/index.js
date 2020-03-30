import { getOrderList } from '@/api/order/index'

export default {
  namespaced: true,
  state: {
    orderList: [],
  },
  mutations: {
    SET_orderList(state, value) {
      state.orderList = value
    },
    DELETE_single(state, index) {
      state.orderList.splice(index, 1)
    },
    DELETE_batch(state, value) {
      state.orderList = value
    },
  },
  actions: {
    getOrderList({ commit, state, rootState }) {
      if (!state.orderList.length) {
        return new Promise((resolve, reject) => {
          getOrderList({ token: rootState.admin.token })
            .then((response) => {
              const { data } = response
              commit('SET_orderList', data.orderList)
              resolve(data.orderList)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.orderList
      }
    },
  },
}
