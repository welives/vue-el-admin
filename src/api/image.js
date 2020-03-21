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

function uploadImage(data) {
  return request({
    url: '/api/uploadImage',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  })
}

export { getAlbums, getImages, uploadImage }
