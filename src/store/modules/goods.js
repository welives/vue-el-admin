import options from './options'
import { getGoodsList } from '@/api/shop/goods'
import * as $utils from '@/utils'
export default {
  namespaced: true,
  state: {
    options,
    // 基础设置表单
    basicForm: {
      name: '',
      desc: '',
      unit: '',
      stock: 0,
      min_stock: 0,
      display_stock: 0,
      status: 0,
      express: '',
      cateVal: [],
    },
    spec: 0,
    // 商品规格/单规格
    singleSpecForm: {
      sPrice: '',
      mPrice: '',
      cPrice: '',
      volume: '',
      weight: '',
      stock: '',
      code: '',
    },
    // 商品规格/多规格
    multipleSpecCard: [
      {
        name: '色调',
        type: 0,
        list: [
          {
            name: '红色',
            image: '',
            color: '',
            isCheck: true,
          },
        ],
      },
      {
        name: '尺寸',
        type: 0,
        list: [
          {
            name: 'S',
            image: '',
            color: '',
            isCheck: true,
          },
          {
            name: 'M',
            image: '',
            color: '',
            isCheck: false,
          },
        ],
      },
    ],
    // 媒体设置图片列表
    imageList: [],
    // 商品类型
    goodsType: '',
    // 商品属性
    goodsAttrs: {
      phoneModel: '',
    },
    discountRate: '',
    // 表头
    thead: [
      { name: '商品规格', rowspan: 2, colspan: 1, width: 300 },
      { name: '规格图片', rowspan: 2, width: 100 },
      { name: '销售价', rowspan: 2, width: 100 },
      { name: '市场价', rowspan: 2, width: 100 },
      { name: '成本价', rowspan: 2, width: 100 },
      { name: '库存', rowspan: 2, width: 100 },
      { name: '体积', rowspan: 2, width: 100 },
      { name: '重量', rowspan: 2, width: 100 },
      { name: '编码', rowspan: 2, width: 100 },
    ],
    goodsList: [],
  },
  mutations: {
    basicFormModel(state, { key, value }) {
      state.basicForm[key] = value
    },
    singleSpecFormModel(state, { key, value }) {
      state.singleSpecForm[key] = value
    },
    changeState(state, { key, value }) {
      state[key] = value
    },
    // 添加规格卡片
    addSpecCard(state) {
      state.multipleSpecCard.push({ name: '规格卡片', type: 0, list: [] })
    },
    // 修改规格卡片
    updateSpecCard(state, { cardIndex, key, value }) {
      state.multipleSpecCard[cardIndex][key] = value
    },
    // 删除规格卡片
    delSpecCard(state, cardIndex) {
      state.multipleSpecCard.splice(cardIndex, 1)
    },
    // 规格卡片排序
    sortSpecCard(state, { action, cardIndex }) {
      $utils[action](state.multipleSpecCard, cardIndex)
    },
    // 增加规格卡片的属性
    addSpecCardValue(state, { cardIndex, name = '' }) {
      state.multipleSpecCard[cardIndex].list.push({
        name,
        image: '',
        color: '',
        isCheck: true,
      })
    },
    // 修改规格卡片的属性
    updateSpecCardValue(state, { cardIndex, index, key, value }) {
      state.multipleSpecCard[cardIndex].list[index][key] = value
    },
    // 删除规格卡片的属性
    delSpecCardValue(state, { cardIndex, index }) {
      state.multipleSpecCard[cardIndex].list.splice(index, 1)
    },
    // 规格卡片属性排序
    sortSpecCardValue(state, { cardIndex, list }) {
      state.multipleSpecCard[cardIndex].list = list
    },
    updateGoodsAttrs(state, { key, value }) {
      state.goodsAttrs[key] = value
    },
    SET_goodsList(state, value) {
      state.goodsList = value
    },
    UPDATE_putway(state, data) {
      const index = state.goodsList.findIndex((v) => v.id === data.row.id)
      state.goodsList[index].isPutaway = data.row.isPutaway
    },
    DELETE_single(state, index) {
      state.goodsList.splice(index, 1)
    },
    DELETE_batch(state, value) {
      state.goodsList = value
    },
    UPDATE_content(state, { id, value }) {
      const index = state.goodsList.findIndex((v) => v.id === id)
      state.goodsList[index].goodsContent = value
    },
    UPDATE_banner(state, { id, value }) {
      const index = state.goodsList.findIndex((v) => v.id === id)
      state.goodsList[index].goodsBanner = value
    },
  },
  actions: {
    getGoodsList({ commit, state, rootState }) {
      if (!state.goodsList.length) {
        return new Promise((resolve, reject) => {
          getGoodsList({ token: rootState.admin.token })
            .then((response) => {
              const { data } = response
              commit('SET_goodsList', data.goodsList)
              resolve(data.goodsList)
            })
            .catch((error) => reject(error))
        })
      } else {
        return state.goodsList
      }
    },
    getGoods({ state }, id) {
      const data = state.goodsList.filter((v) => v.id === id)
      return data[0]
    },
  },
}
