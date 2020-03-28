import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { commentList } = Mock.mock({
  'commentList|15-30': [
    {
      id: '@increment',
      username: '@cname',
      avatar: '@dataImage("60x60")',
      title: '@ctitle',
      content: '@cparagraph',
      'star|1-5.1': 1,
      cover: '@dataImage("336x280")',
      'reply|1': ['', '@cparagraph'],
      commentTime: '@datetime',
      replyTime: function() {
        if (this.reply === '') {
          return ''
        } else {
          return Mock.mock('@datetime')
        }
      },
      'status|1-2': false,
    },
  ],
})

function getComment(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, commentList }
}

export { getComment }
