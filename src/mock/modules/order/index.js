import Mock from 'mockjs'
import { get } from '@/utils/auth'

const expressList = [
  '顺丰快递',
  '圆通快递',
  '申通快递',
  '中通快递',
  '百世快递',
  '韵达快递',
  '京东快递',
  '天天快递',
  '中国邮政',
  '宅急送',
  '全峰快递',
]

const { orderList } = Mock.mock({
  'orderList|100-200': [
    {
      'id|+1': 1,
      username: '@cname',
      phone: /^1[3578][1-9]\d{8}$/,
      title: '@ctitle',
      cover: '@dataImage("336x280")',
      serial: '@natural(15)',
      createTime: '@datetime',
      'closed|1-10': true,
      payType: function() {
        if (!this.closed) {
          const { payType } = Mock.mock({
            'payType|1': ['wechat', 'alipay', 'nopay'],
          })
          return payType
        }
      },
      payment: function() {
        if (!this.closed) {
          if (this.payType !== 'nopay') {
            const payment = Mock.mock('@float(30,200,2,2)')
            return payment
          } else {
            return 0
          }
        } else {
          return 0
        }
      },
      freight: function() {
        if (!this.closed) {
          if (this.payType !== 'nopay') {
            const freight = Mock.mock('@float(1,10,2,2)')
            return freight
          } else {
            return 0
          }
        } else {
          return 0
        }
      },
      'express|1': expressList,
      expressSerial: function() {
        const { Random } = Mock
        if (!this.closed && this.status >= 2) {
          return Random.natural(16)
        } else {
          return ''
        }
      },
      status: function() {
        // 0未付款,1已付款,2已发货,3已收货,4已完成
        if (!this.closed) {
          if (this.payType !== 'nopay') {
            const { status } = Mock.mock({ 'status|1': [1, 2, 3, 4] })
            return status
          } else {
            return 0
          }
        } else {
          return 0
        }
      },
      refunding: function() {
        const { Random } = Mock
        if (!this.closed && this.status > 0) {
          return Random.boolean(1, 10, true)
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

function getExpressList(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, expressList }
}

export { getOrderList, getExpressList }
