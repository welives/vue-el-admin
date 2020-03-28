import { Random } from 'mockjs'
import { get } from '@/utils/auth'

const menus = [
  {
    id: 1,
    status: true,
    create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    title: '首页',
    sideActive: 0,
    child: [
      {
        id: 10,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '后台首页',
        name: 'index',
        path: '/index',
        icon: 'el-icon-s-home',
        roles: ['admin', 'editor'],
      },
      {
        id: 11,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '相册管理',
        name: 'image',
        path: '/image',
        icon: 'el-icon-picture',
        roles: ['admin', 'editor'],
      },
    ],
  },
  {
    id: 2,
    status: true,
    create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    title: '商品',
    sideActive: 0,
    child: [
      {
        id: 21,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '商品列表',
        name: 'shop_goods',
        path: '/shop/goods',
        icon: 'el-icon-s-shop',
        roles: ['admin', 'editor'],
      },
      {
        id: 22,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '商品分类',
        name: 'shop_category',
        path: '/shop/category',
        icon: 'el-icon-s-data',
        roles: ['admin', 'editor'],
      },
      {
        id: 23,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '商品规格',
        name: 'shop_spec',
        path: '/shop/spec',
        icon: 'el-icon-s-management',
        roles: ['admin', 'editor'],
      },
      {
        id: 24,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '商品类型',
        name: 'shop_type',
        path: '/shop/type',
        icon: 'el-icon-s-management',
        roles: ['admin', 'editor'],
      },
      {
        id: 25,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '商品评价',
        name: 'shop_comment',
        path: '/shop/comment',
        icon: 'el-icon-document',
        roles: ['admin', 'editor'],
      },
    ],
  },
  {
    id: 3,
    status: true,
    create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    title: '订单',
    sideActive: 0,
    child: [
      {
        id: 31,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '订单列表',
        name: 'order',
        path: '/order',
        icon: 'el-icon-s-order',
        roles: ['admin', 'editor'],
      },
      {
        id: 32,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '发票列表',
        name: 'order_invoice',
        path: '/shop/invoice',
        icon: 'el-icon-tickets',
        roles: ['admin', 'editor'],
      },
      {
        id: 33,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '售后服务',
        name: 'order_after-sale',
        path: '/order/after-sale',
        icon: 'el-icon-help',
        roles: ['admin', 'editor'],
      },
    ],
  },
  {
    id: 4,
    status: true,
    create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    title: '会员',
    sideActive: 0,
    child: [
      {
        id: 41,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '会员列表',
        name: 'user',
        path: '/user',
        icon: 'el-icon-user',
        roles: ['admin', 'editor'],
      },
      {
        id: 42,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '会员等级',
        name: 'user_user-level',
        path: '/user/user-level',
        icon: 'el-icon-user',
        roles: ['admin', 'editor'],
      },
    ],
  },
  {
    id: 5,
    status: true,
    create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    title: '设置',
    sideActive: 0,
    child: [
      {
        id: 51,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '基础设置',
        name: 'setting_base',
        path: '/setting/base',
        icon: 'el-icon-setting',
        roles: ['admin'],
      },
      {
        id: 52,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '物流设置',
        name: 'setting_express',
        path: '/setting/express',
        icon: 'el-icon-setting',
        roles: ['admin'],
      },
      {
        id: 53,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '管理员设置',
        name: 'setting_manager',
        path: '/setting/manager',
        icon: 'el-icon-setting',
        roles: ['admin'],
      },
      {
        id: 54,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '交易设置',
        name: 'setting_trade',
        path: '/setting/trade',
        icon: 'el-icon-setting',
        roles: ['admin'],
      },
      {
        id: 55,
        status: true,
        create_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        update_time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        title: '测试页',
        name: 'test',
        path: '/test',
        icon: 'el-icon-setting',
        roles: ['admin', 'editor'],
      },
    ],
  },
]

const buttons = {
  editor: ['添加规格'],
}
function getMenus(request) {
  const { roles, token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  const list = menus.map((item) => {
    const sideMenu = []
    item.child.some((v) => {
      if (v.roles.includes(roles[0])) {
        sideMenu.push({
          icon: v.icon,
          title: v.title,
          name: v.name,
          path: v.path,
        })
      }
    })
    return {
      title: item.title,
      sideActive: 0,
      sideMenu: sideMenu,
    }
  })
  const accessBtns = buttons[roles[0]]
  return { code: 20000, list, accessBtns }
}

export { getMenus }
