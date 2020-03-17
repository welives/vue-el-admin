import request from '@/plugins/axios'

function getMenus(data) {
  return request({
    url: '/api/getMenus',
    method: 'get',
    data,
  })
}

export { getMenus }
