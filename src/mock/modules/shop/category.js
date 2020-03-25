import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { category } = Mock.mock({
  'category|3': [
    {
      id: '@increment',
      name: '@cword(2,4)',
      'status|1-2': false,
      create_time: '@datetime',
      update_time: '@datetime',
      category_id: 0,
      child: function() {
        const { child } = Mock.mock({
          'child|0-3': [
            {
              id: '@increment',
              name: '@cword(2,4)',
              'status|1-2': false,
              create_time: '@datetime',
              update_time: '@datetime',
              category_id: this.id,
              child: function() {
                const { child } = Mock.mock({
                  'child|0-3': [
                    {
                      id: '@increment',
                      name: '@cword(2,4)',
                      'status|1-2': false,
                      create_time: '@datetime',
                      update_time: '@datetime',
                      category_id: this.id,
                      child: [],
                    },
                  ],
                })
                return child
              },
            },
          ],
        })
        return child
      },
    },
  ],
})

function getCategory(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, category }
}

export { getCategory }
