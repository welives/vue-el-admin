import Mock from 'mockjs'
import * as adminAPI from './modules/admin'
import * as menuAPI from './modules/menu'
import * as imageAPI from './modules/image'
import * as categoryAPI from './modules/shop/category'
import * as specAPI from './modules/shop/spec'
import * as typeAPI from './modules/shop/type'
import * as commentAPI from './modules/shop/comment'
import * as usersAPI from './modules/user/index'
import * as levelAPI from './modules/user/level'
import * as orderAPI from './modules/order/index'
import * as managerAPI from './modules/setting/manager'
import * as baseAPI from './modules/setting/base'

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

// 会员相关
Mock.mock(/\/api\/userList/, 'get', usersAPI.getUserList)
Mock.mock(/\/api\/user\/level/, 'get', levelAPI.getLevelList)

// 订单相关
Mock.mock(/\/api\/order/, 'get', orderAPI.getOrderList)

// 设置相关
Mock.mock(/\/api\/setting\/base/, 'get', baseAPI.getBase)
Mock.mock(/\/api\/setting\/manager/, 'get', managerAPI.getAdminList)
Mock.mock(/\/api\/setting\/role/, 'get', managerAPI.getRoleList)

export default Mock
