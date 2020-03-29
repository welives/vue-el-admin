import { getCategory } from '@/api/shop/category'

function iteratorCate(arr, data) {
  const { id, key, value } = data
  arr.some((v) => {
    if (v.id === id) {
      if (key === 'status') {
        v.status = value
      }
      if (key === 'name') {
        v.name = value
      }
      if (key === 'child') {
        v.child.push(value)
      }
    } else if (v.child.length) {
      iteratorCate(v.child, data)
    }
  })
}

function remove(arr, data) {
  // level=1
  if (data.category_id === 0) {
    const index = arr.findIndex((v) => v.id === data.id)
    arr.splice(index, 1)
  } else {
    for (let i = 0; i < arr.length; i++) {
      // level=2
      arr[i].child.some((v) => {
        if (v.id === data.id) {
          const idx = arr[i].child.findIndex((f) => f.id === data.id)
          arr[i].child.splice(idx, 1)
        }
        if (v.id === data.category_id) {
          // level=3
          const idx = v.child.findIndex((f) => f.id === data.id)
          v.child.splice(idx, 1)
        }
        // level...
        if (v.child.length) {
          remove(v.child, data)
        }
      })
    }
  }
}

export default {
  namespaced: true,
  state: {
    category: [],
  },
  mutations: {
    // 设置分类
    SET_category(state, value) {
      state.category = value
    },
    // 更新状态
    UPDATE_status(state, data) {
      iteratorCate(state.category, data)
    },
    // 修改分类名称
    UPDATE_name(state, data) {
      iteratorCate(state.category, data)
    },
    // 新增顶级分类
    APPEND_top(state, value) {
      state.category.push(value)
    },
    // 新增子分类
    APPEND_child(state, data) {
      iteratorCate(state.category, data)
    },
    // 删除分类
    DELETE_category(state, data) {
      remove(state.category, data)
    },
  },
  actions: {
    // 获取分类
    getCategory({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        getCategory({ token: rootState.admin.token })
          .then((response) => {
            const { data } = response
            commit('SET_category', data.category)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}
