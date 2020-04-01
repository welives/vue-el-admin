import { getPaymentList, getShoppingConfig } from '@/api/setting/trade'

export default {
  namespaced: true,
  state: {
    paymentList: [],
    shoppingConfig: '',
  },
  mutations: {
    SET_paymentList(state, value) {
      state.paymentList = value
    },
    SET_shoppingConfig(state, value) {
      state.shoppingConfig = value
    },
    UPDATE_status(state, data) {
      const index = state.paymentList.findIndex((v) => v.id === data.row.id)
      state.paymentList[index].status = data.row.status
    },
    UPDATE_payment(state, { index, value }) {
      state.paymentList[index].payConfig = { ...value }
    },
  },
  actions: {
    getPaymentList({ commit, state, rootState }) {
      if (!state.paymentList.length) {
        return new Promise((resolve, reject) => {
          getPaymentList({ token: rootState.admin.token })
            .then((response) => {
              const { data } = response
              commit('SET_paymentList', data.paymentList)
              resolve(data.paymentList)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.paymentList
      }
    },
    getShoppingConfig({ commit, state, rootState }) {
      if (state.shoppingConfig === '') {
        return new Promise((resolve, reject) => {
          getShoppingConfig({ token: rootState.admin.token })
            .then((response) => {
              const { data } = response
              commit('SET_shoppingConfig', data.shoppingConfig)
              resolve(data.shoppingConfig)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.shoppingConfig
      }
    },
  },
}
