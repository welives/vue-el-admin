import Mock from 'mockjs'
import userAPI from './modules/user'

// 登录相关
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)
