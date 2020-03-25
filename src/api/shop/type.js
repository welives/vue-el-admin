import request from '@/plugins/axios'

function getType(data) {
  return request({
    url: '/api/shop/type',
    method: 'get',
    data,
  })
}

export { getType }
