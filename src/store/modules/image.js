import { getAlbums, getImages } from '@/api/image'

export default {
  namespaced: true,
  state: {
    albumList: [],
  },
  mutations: {
    SET_ALBUM(state, value) {
      state.albumList = value
    },
    SET_IMAGELIST(state, { id, value }) {
      state.albumList.some((v) => {
        if (v.id === id) {
          v.imageList = value
        }
      })
    },
  },
  actions: {
    getAlbums({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        getAlbums({ token: rootState.user.token })
          .then((response) => {
            const { data } = response
            commit('SET_ALBUM', data.albumList)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getImages({ commit, rootState }, id) {
      return new Promise((resolve, reject) => {
        getImages({ token: rootState.user.token, id })
          .then((response) => {
            const { data } = response
            commit('SET_IMAGELIST', { id, value: data.imageList })
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}
