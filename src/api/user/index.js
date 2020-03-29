import request from '@/plugins/axios'

function getUserList(data) {
  return request({
    url: '/api/userList',
    method: 'get',
    data,
  })
}

export { getUserList }
