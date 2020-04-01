import request from '@/plugins/axios'

function getPaymentList(data) {
  return request({
    url: '/api/setting/payment',
    method: 'get',
    data,
  })
}

function getShoppingConfig(data) {
  return request({
    url: '/api/setting/shopping',
    method: 'get',
    data,
  })
}

export { getPaymentList, getShoppingConfig }
