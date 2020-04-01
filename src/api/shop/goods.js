import request from '@/plugins/axios'

function getGoodsList(data) {
  return request({
    url: '/api/shop/goods',
    methed: 'get',
    data,
  })
}
export { getGoodsList }
