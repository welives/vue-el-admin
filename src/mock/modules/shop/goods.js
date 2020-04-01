import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { goodsList } = Mock.mock({
  'goodsList|50-100': [
    {
      'id|+1': 1,
      title: '@ctitle',
      cover: '@dataImage("336x280")',
      serial: '@natural(15)',
      'cate|1': [0, 1, 2, 3],
      sale_count: '@integer(1,100)',
      order: '@integer(1,100)',
      status: '@boolean',
      // 0待处理,1通过,2拒绝
      isChecked: function() {
        if (this.isPutaway) {
          return 1
        } else {
          const { isChecked } = Mock.mock({ 'isChecked|1': [0, 2] })
          return isChecked
        }
      },
      stock: '@integer(0,100)',
      price: '@integer(1000,10000)',
      createTime: '@datetime',
      isPutaway: '@boolean',
    },
  ],
})

function getGoodsList(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, goodsList }
}

export { getGoodsList }
