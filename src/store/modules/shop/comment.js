import { getComment } from '@/api/shop/comment'

export default {
  namespaced: true,
  state: {
    commentList: [],
  },
  mutations: {
    SET_commentList(state, value) {
      state.commentList = value
    },
    UPDATE_status(state, data) {
      const index = state.commentList.findIndex((v) => v.id === data.row.id)
      state.commentList[index].status = data.row.status
    },
    SET_reply(state, data) {
      const { index, value, time } = data
      state.commentList[index].reply = value
      state.commentList[index].replyTime = time
    },
  },
  actions: {
    getComment({ commit, state, rootState }) {
      if (!state.commentList.length) {
        return new Promise((resolve, reject) => {
          getComment({ token: rootState.admin.token })
            .then((response) => {
              const { data } = response
              commit('SET_commentList', data.commentList)
              resolve(data.commentList)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.commentList
      }
    },
  },
}
