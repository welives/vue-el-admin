import request from '@/plugins/axios'

function getCategory(data) {
  return request({
    url: '/api/shop/category',
    method: 'get',
    data,
  })
}

export { getCategory }
