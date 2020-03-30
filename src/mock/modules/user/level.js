import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { levelList } = Mock.mock({
  levelList: [
    {
      id: 1,
      name: '普通会员',
      consume: 0,
      times: 0,
      discount: 0,
      order: '@integer(1,100)',
      status: '@boolean',
    },
    {
      id: 2,
      name: 'VIP会员',
      consume: 500,
      times: 50,
      discount: 5,
      order: '@integer(1,100)',
      status: '@boolean',
    },
    {
      id: 3,
      name: '白银会员',
      consume: 1000,
      times: 100,
      discount: 10,
      order: '@integer(1,100)',
      status: '@boolean',
    },
    {
      id: 4,
      name: '黄金会员',
      consume: 5000,
      times: 200,
      discount: 15,
      order: '@integer(1,100)',
      status: '@boolean',
    },
    {
      id: 5,
      name: '钻石会员',
      consume: 10000,
      times: 500,
      discount: 20,
      order: '@integer(1,100)',
      status: '@boolean',
    },
  ],
})

function getLevelList(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, levelList }
}

export { getLevelList }
