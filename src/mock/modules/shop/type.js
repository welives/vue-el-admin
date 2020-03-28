import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { typeList } = Mock.mock({
  'typeList|15-30': [
    {
      id: '@increment',
      name: '@cword(2,4)',
      order: '@integer(1,100)',
      'status|1-2': false,
      'specList|1-3': [
        {
          'id|+1': 50,
          name: '@cword(2,4)',
          'type|1': [0, 1, 2],
          value: [],
        },
      ],
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

function getTypeList(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, typeList }
}

export { getTypeList }
