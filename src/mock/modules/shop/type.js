import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { type } = Mock.mock({
  'type|15-30': [
    {
      id: '@increment',
      name: '@cword(2,4)',
      order: '@integer(1,100)',
      'status|1-2': false,
      'specList|1-2': [{ name: '@cword(2,4)' }, { name: '@cword(2,4)' }],
      'valueList|1-2': [
        {
          order: '@integer(1,100)',
          name: '@cword(2,4)',
          'type|1': ['input', 'radio', 'checkbox'],
          'value|1-2': ['@word(2,4)', '@cword(2,4)'],
          'isShow|1-2': false,
          isEdit: false,
        },
      ],
    },
  ],
})

function getType(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, type }
}

export { getType }
