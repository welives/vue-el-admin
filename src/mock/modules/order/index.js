import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { orderList } = Mock.mock({
  'orderList|50-100': [
    {
      id: '@increment',
      'uid|+1': 1,
      username: '@cname',
      phone: /^1[3578][1-9]\d{8}$/,
      title: '@ctitle',
      cover: '@dataImage("336x280")',
      serial: '@natural(15)',
      createTime: '@datetime',
      'payType|1': ['wechat', 'alipay', 'nopay'],
      payment: function() {
        let payment = 0
        if (this.payType !== 'nopay') {
          payment = Mock.mock('@float(30,200,2,2)')
        }
        return payment
      },
      freight: function() {
        let freight = 0
        if (this.payType !== 'nopay') {
          freight = Mock.mock('@float(1,10,2,2)')
        }
        return freight
      },
      'express|1': [
        '顺丰快递',
        '圆通快递',
        '申通快递',
        '百世快递',
        '韵达快递',
        '京东快递',
        '天天快递',
      ],
      status: function() {
        // 0未付款,1已付款,2已发货,3已收货,4已完成,5已关闭
        if (this.payType !== 'nopay') {
          const { status } = Mock.mock({ 'status|1': [1, 2, 3] })
          return status
        } else {
          return 0
        }
      },
    },
  ],
})

function getOrderList(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, orderList }
}

export { getOrderList }
