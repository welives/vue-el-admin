import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { adminList } = Mock.mock({
  adminList: [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      avatar: '@dataImage("60x60")',
      name: '@cname',
      age: '@integer(10, 40)',
      email: '@email',
      role: 'admin',
    },
    {
      id: 2,
      username: 'editor',
      password: '123456',
      avatar: '@dataImage("60x60")',
      name: '@cname',
      age: '@integer(10, 40)',
      email: '@email',
      role: 'editor',
    },
  ],
})

function login(request) {
  const { username, password } = JSON.parse(request.body)
  let admin = false
  adminList.some((v) => {
    if (v.username === username && v.password === password) {
      admin = v
    }
  })
  if (admin) {
    return { code: 20000, msg: '登录成功', admin, token: Mock.mock('@guid') }
  }
  return { code: 20001, msg: '用户名或密码错误' }
}

function logout(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, msg: '退出成功' }
}
function getRoles(request) {
  const { username, token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  const roles = []
  adminList.some((v) => {
    if (v.username === username) {
      roles.push(v.role)
    }
  })
  return { code: 20000, roles }
}
export { login, logout, getRoles }
