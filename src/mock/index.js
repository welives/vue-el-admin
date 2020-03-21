import Mock from 'mockjs'
import * as userAPI from './modules/user'
import * as menuAPI from './modules/menu'
import * as imageAPI from './modules/image'

// 登录相关
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/logout/, 'get', userAPI.logout)
Mock.mock(/\/user\/getRoles/, 'get', userAPI.getRoles)

Mock.mock(/\/api\/getMenus/, 'get', menuAPI.getMenus)

// 图片相关
Mock.mock(/\/api\/getAlbums/, 'get', imageAPI.getAlbums)
Mock.mock(/\/api\/getImages/, 'post', imageAPI.getImages)
Mock.mock(/\/api\/uploadImage/, 'post', imageAPI.uploadImage)

export default Mock
