import request from '@/plugins/axios'

function getOrderList(data) {
  return request({
    url: '/api/order',
    method: 'get',
    data,
  })
}

function getExpressList(data) {
  return request({
    url: '/api/express',
    method: 'get',
    data,
  })
}

export { getOrderList, getExpressList }
