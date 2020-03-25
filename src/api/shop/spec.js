import request from '@/plugins/axios'

function getSpec(data) {
  return request({
    url: '/api/shop/spec',
    method: 'get',
    data,
  })
}

export { getSpec }
