import options from './options'
import $utils from '@/utils'
export default {
  namespaced: true,
  state: {
    options,
    basicForm: {
      name: '',
      desc: '',
      unit: '',
      stock: 0,
      min_stock: 0,
      display_stock: 0,
      status: 0,
      express: '',
      cateVal: []
    },
    spec: 0,
    singleSpecForm: {
      sPrice: '',
      mPrice: '',
      cPrice: '',
      volume: '',
      weight: '',
      stock: '',
      code: ''
    },
    multipleSpecCard: [
      {
        name: '色调',
        type: 0,
        list: [
          {
            id: 1,
            name: '红色',
            image: '',
            color: '',
            isCheck: false
          },
          {
            id: 2,
            name: '绿色',
            image: '',
            color: '',
            isCheck: false
          },
          {
            id: 3,
            name: '蓝色',
            image: '',
            color: '',
            isCheck: false
          }
        ]
      },
      {
        name: '尺寸',
        type: 0,
        list: [
          {
            id: 1,
            name: 'S',
            image: '',
            color: '',
            isCheck: false
          },
          {
            id: 2,
            name: 'M',
            image: '',
            color: '',
            isCheck: false
          },
          {
            id: 3,
            name: 'L',
            image: '',
            color: '',
            isCheck: false
          },
          {
            id: 4,
            name: 'XL',
            image: '',
            color: '',
            isCheck: false
          },
          {
            id: 5,
            name: 'XXL',
            image: '',
            color: '',
            isCheck: false
          }
        ]
      }
    ],
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
      { name: '编码', rowspan: 2, width: 100 }
    ]
  },
  mutations: {
    basicFormModel(state, { key, value }) {
      state.basicForm[key] = value
    },
    singleSpecFormModel(state, { key, value }) {
      state.singleSpecForm[key] = value
    },
    changeSpec(state, value) {
      state.spec = value
    },
    // 添加规格卡片
    addSpecCard(state) {
      state.multipleSpecCard.push({ name: '', type: 0, list: [] })
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
        id: state.multipleSpecCard[cardIndex].list.length + 1,
        name,
        image: '',
        color: '',
        isCheck: false
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
    }
  },
  actions: {}
}
