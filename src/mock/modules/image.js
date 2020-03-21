import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { albumList } = Mock.mock({
  'albumList|5-10': [
    {
      'id|+1': 1,
      name: '@cword(4)',
      order: 50,
      imagesCount: '@integer(20,50)',
      imageList: [],
    },
  ],
})

function getAlbums(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, albumList }
}

function getImages(request) {
  const { token, id } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  let imagesCount = 0
  albumList.some((v) => {
    if (v.id === id) {
      imagesCount = v.imagesCount
    }
  })
  imagesCount = imagesCount || Mock.mock('@integer(20,50)')
  const { imageList } = Mock.mock({
    imageList: function() {
      const arr = []
      for (let i = 0; i < imagesCount; i++) {
        arr.push(
          Mock.mock({
            id: i + 1,
            url: "@dataImage('336x280')",
            name: /^([a-z][0-9][A-Z]){2,3}\.png$/,
            path: 'public/@name',
            create_time: '@datetime',
            update_time: '@datetime',
            albumId: id,
            isCheck: false,
          }),
        )
      }
      return arr
    },
  })
  return { code: 20000, imageList }
}

function uploadImage(request) {
  // const { token } = JSON.parse(request.body)
  // if (token && get('token', false) !== token) {
  //   return { code: 20002, msg: '非法操作' }
  // }
  return { code: 20000 }
}

export { getAlbums, getImages, uploadImage }
