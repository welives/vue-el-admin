import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { userList } = Mock.mock({
  'userList|15-30': [
    {
      id: '@increment',
      username: '@cname',
      password: '@string(16,32)',
      nickname: '@first',
      phone: /^1[3578][1-9]\d{8}$/,
      email: '@email',
      'sex|1': [0, 1, 2],
      avatar: '@dataImage("60x60")',
      'level|1': [0, 1, 2, 3, 4],
      createTime: '@datetime',
      lastTime: '@now',
      'status|1-2': false,
    },
  ],
})

function getUserList(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, userList }
}

export { getUserList }
