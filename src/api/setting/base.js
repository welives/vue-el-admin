import request from '@/plugins/axios'

function getBase(data) {
  return request({
    url: '/api/setting/base',
    method: 'get',
    data,
  })
}

export { getBase }
