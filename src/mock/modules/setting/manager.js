import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { adminList } = Mock.mock({
  'adminList|15-30': [
    {
      'id|+1': 1,
      username: function() {
        if (this.id === 1) {
          return 'admin'
        } else if (this.id === 2) {
          return 'editor'
        } else {
          return Mock.mock('@string("lower",5,10)')
        }
      },
      password: '@string',
      nickname: '@cname',
      avatar: '@dataImage("60x60")',
      phone: /^1[3578][1-9]\d{8}$/,
      email: '@email',
      groupId: function() {
        if (this.id === 1) {
          return 0
        } else if (this.id === 2) {
          return 0
        } else {
          const { groupId } = Mock.mock({ 'groupId|1': [0, 1, 2, 3] })
          return groupId
        }
      },
      groupName: function() {
        const groupName = ['管理员', '财务', '运营专员', '客服']
        if (this.id === 1) {
          return groupName[0]
        } else if (this.id === 2) {
          return groupName[0]
        } else {
          return groupName[this.groupId]
        }
      },
      createTime: '@datetime',
      lastTime: '@now',
      'status|1-2': false,
    },
  ],
})

const { roleList } = Mock.mock({
  'roleList|5-10': [
    {
      'id|+1': 1,
      name: '@cword(4)',
      createTime: '@datetime',
      'status|1-2': false,
    },
  ],
})

function getAdminList(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, adminList }
}

function getRoleList(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, roleList }
}

export { getAdminList, getRoleList }
