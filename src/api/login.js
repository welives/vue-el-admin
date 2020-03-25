import request from '@/plugins/axios'

// 封装请求
function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data,
  })
}

function logout(data) {
  return request({
    url: '/api/logout',
    method: 'get',
    data,
  })
}

function getRoles(data) {
  return request({
    url: '/api/getRoles',
    method: 'get',
    data,
  })
}

export { login, logout, getRoles }
