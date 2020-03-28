import request from '@/plugins/axios'

function getUsers(data) {
  return request({
    url: '/api/user',
    method: 'get',
    data,
  })
}

export { getUsers }
