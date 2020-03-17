import Mock from 'mockjs'
import * as userAPI from './modules/user'
import * as menuAPI from './modules/menu'

// 登录相关
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)
Mock.mock(/\/user\/getRoles/, 'get', userAPI.getRoles)

Mock.mock(/\/api\/getMenus/, 'get', menuAPI.getMenus)

export default Mock
