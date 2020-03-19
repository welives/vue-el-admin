import request from '@/plugins/axios'

function getAlbums(data) {
  return request({
    url: '/api/getAlbums',
    method: 'get',
    data,
  })
}

function getImages(data) {
  return request({
    url: '/api/getImages',
    method: 'post',
    data,
  })
}

export { getAlbums, getImages }
