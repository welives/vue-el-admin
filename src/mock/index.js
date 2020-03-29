import Mock from 'mockjs'
import * as adminAPI from './modules/admin'
import * as menuAPI from './modules/menu'
import * as imageAPI from './modules/image'
import * as categoryAPI from './modules/shop/category'
import * as specAPI from './modules/shop/spec'
import * as typeAPI from './modules/shop/type'
import * as commentAPI from './modules/shop/comment'

// 登录相关
Mock.mock(/\/api\/login/, 'post', adminAPI.login)
Mock.mock(/\/api\/logout/, 'get', adminAPI.logout)
Mock.mock(/\/api\/getRoles/, 'get', adminAPI.getRoles)

Mock.mock(/\/api\/getMenus/, 'get', menuAPI.getMenus)

// 图片相关
Mock.mock(/\/api\/getAlbums/, 'post', imageAPI.getAlbums)
Mock.mock(/\/api\/getImages/, 'post', imageAPI.getImages)
Mock.mock(/\/api\/uploadImage/, 'post', imageAPI.uploadImage)

// 商品相关
Mock.mock(/\/api\/shop\/category/, 'get', categoryAPI.getCategory)
Mock.mock(/\/api\/shop\/spec/, 'get', specAPI.getSpecList)
Mock.mock(/\/api\/shop\/type/, 'get', typeAPI.getTypeList)
Mock.mock(/\/api\/shop\/comment/, 'get', commentAPI.getComment)

export default Mock
