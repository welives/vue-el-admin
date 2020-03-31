import { getBase } from '@/api/setting/base'

export default {
  namespaced: true,
  state: {
    access: '',
    upload: '',
    security: '',
  },
  mutations: {
    SET_data(state, { key, value }) {
      state[key] = value
    },
    UPLOAD_data(state, { key, value }) {
      state[key] = { ...value }
    },
  },
  actions: {
    getBase({ commit, state, rootState }, key) {
      if (state[key] === '') {
        return new Promise((resolve, reject) => {
          getBase({ token: rootState.admin.token })
            .then((response) => {
              const { data } = response
              commit('SET_data', { key, value: data.base[key] })
              resolve(data.base[key])
            })
            .catch((error) => reject(error))
        })
      } else {
        return state[key]
      }
    },
  },
}
