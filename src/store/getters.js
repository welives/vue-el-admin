import * as $utils from '@/utils'
const getters = {
  options: (state) => state.goods.options,
  basicForm: (state) => state.goods.basicForm,
  spec: (state) => state.goods.spec,
  singleSpecForm: (state) => state.goods.singleSpecForm,
  multipleSpecCard: (state) => state.goods.multipleSpecCard,
  getThead: (state, getters) => {
    const specCard = getters.multipleSpecCard.filter((v) => v.list.length > 0)
    const length = specCard.length
    state.goods.thead[0].colspan = length
    state.goods.thead[0].rowspan = length > 0 ? 1 : 2
    return state.goods.thead
  },
  getTbody: (state, getters) => {
    const length = getters.multipleSpecCard.length
    if (length === 0) return []
    const specList = []
    for (let i = 0; i < length; i++) {
      if (getters.multipleSpecCard[i].list.length > 0) {
        // specList.push(getters.multipleSpecCard[i].list.filter((v) => v.isCheck))
        specList.push(getters.multipleSpecCard[i].list)
      }
    }
    if (specList.length === 0) return []
    const arr = $utils.cartesianProductOf(...specList)
    return arr.map((v) => {
      return {
        specs: v,
        image: '',
        sPrice: 0,
        mPrice: 0,
        cPrice: 0,
        stock: 0,
        volume: 0,
        weight: 0,
        code: '',
      }
    })
  },
  goodsType: (state) => state.goods.goodsType,
  goodsAttrs: (state) => state.goods.goodsAttrs,
  discountRate: (state) => state.goods.discountRate,
}
export default getters
