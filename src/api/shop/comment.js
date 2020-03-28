import request from '@/plugins/axios'

function getComment(data) {
  return request({
    url: '/api/shop/comment',
    method: 'get',
    data,
  })
}

export { getComment }
