import request from '@/plugins/axios'

function getLevelList(data) {
  return request({
    url: '/api/user/level',
    method: 'get',
    data,
  })
}

export { getLevelList }
