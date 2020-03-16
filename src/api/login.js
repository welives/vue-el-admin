import request from '@/plugins/axios'

// 封装请求
function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
    token: true,
  })
}

export { login, logout }
