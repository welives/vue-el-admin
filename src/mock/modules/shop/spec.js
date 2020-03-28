import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { specList } = Mock.mock({
  'specList|15-30': [
    {
      id: '@increment',
      name: '@cword(2,3)',
      order: '@integer(1,50)',
      'status|1-2': false,
      'type|1': [0, 1, 2],
      'value|1-3': [
        {
          name: '@cword(2,4)',
          color: '',
          image: '',
          isCheck: false,
        },
      ],
    },
  ],
})

function getSpecList(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, specList }
}

export { getSpecList }
