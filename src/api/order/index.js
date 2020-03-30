import request from '@/plugins/axios'

function getOrderList(data) {
  return request({
    url: '/api/order',
    method: 'get',
    data,
  })
}

export { getOrderList }
