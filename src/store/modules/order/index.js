import { getOrderList, getExpressList } from '@/api/order/index'

export default {
  namespaced: true,
  state: {
    orderList: [],
    expressList: [],
  },
  mutations: {
    SET_orderList(state, value) {
      state.orderList = value
    },
    SET_expressList(state, value) {
      state.expressList = value
    },
    DELETE_single(state, index) {
      state.orderList.splice(index, 1)
    },
    DELETE_batch(state, value) {
      state.orderList = value
    },
    DO_ship(state, obj) {
      const { index, data } = obj
      state.orderList[index].status = 2
      state.orderList[index].express = data.express
      state.orderList[index].expressSerial = data.serial
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

    getExpressList({ commit, state, rootState }) {
      if (!state.orderList.length) {
        return new Promise((resolve, reject) => {
          getExpressList({ token: rootState.admin.token })
            .then((response) => {
              const { data } = response
              commit('SET_expressList', data.expressList)
              resolve(data.expressList)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.expressList
      }
    },
  },
}
