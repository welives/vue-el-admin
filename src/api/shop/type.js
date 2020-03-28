import request from '@/plugins/axios'

function getTypeList(data) {
  return request({
    url: '/api/shop/type',
    method: 'get',
    data,
  })
}

export { getTypeList }
