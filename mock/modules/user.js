import { Random } from 'mockjs'
const userData = {
  users: [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      avatar: Random.dataImage('60x60'),
      name: Random.cname(),
      age: Random.integer(10, 40),
      email: Random.email()
    },
    {
      id: 2,
      username: 'editor',
      password: '123456',
      avatar: Random.dataImage('60x60'),
      name: Random.cname(),
      age: Random.integer(10, 40),
      email: Random.email()
    },
    {
      id: 3,
      username: 'guest01',
      password: '123456',
      avatar: Random.dataImage('60x60'),
      name: Random.cname(),
      age: Random.integer(10, 40),
      email: Random.email()
    }
  ]
}
export default {
  login(request) {
    const { username, password } = JSON.parse(request.body)
    let data = false
    userData.users.some((v) => {
      if (v.username === username && v.password === password) {
        data = v
      }
    })
    if (data) {
      return { code: 20000, msg: '登录成功', data, token: Random.guid() }
    }
    return { code: 20001, msg: '用户名或密码错误' }
  },
  logout() {
    return { code: 20000, msg: '退出成功' }
  }
}
