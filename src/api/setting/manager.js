import request from '@/plugins/axios'

function getAdminList(data) {
  return request({
    url: '/api/setting/manager',
    method: 'get',
    data,
  })
}

function getRoleList(data) {
  return request({
    url: '/api/setting/role',
    method: 'get',
    data,
  })
}

export { getAdminList, getRoleList }
