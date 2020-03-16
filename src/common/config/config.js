export default {
  logo: 'ADMIN',
  navBar: {
    active: 0,
    list: [
      {
        name: '首页',
        sideActive: 0,
        sideMenu: [
          { icon: 'el-icon-s-home', name: '后台首页', path: 'index' },
          { icon: 'el-icon-s-order', name: '商品列表', path: 'shop_goods' },
          { icon: 'el-icon-picture', name: '相册管理', path: 'image' }
        ]
      },
      {
        name: '商品',
        sideActive: 0,
        sideMenu: [
          { icon: 'el-icon-s-shop', name: '商品列表', path: 'shop_goods' },
          { icon: 'el-icon-s-data', name: '商品分类', path: 'shop_category' },
          { icon: 'el-icon-s-management', name: '商品规格', path: 'shop_spec' },
          { icon: 'el-icon-s-management', name: '商品类型', path: 'shop_type' },
          { icon: 'el-icon-document', name: '商品评论', path: 'shop_comment' }
        ]
      },
      {
        name: '订单',
        sideActive: 0,
        sideMenu: [
          { icon: 'el-icon-s-order', name: '订单列表', path: 'order' },
          { icon: 'el-icon-tickets', name: '发票列表', path: 'order_invoice' },
          {
            icon: 'el-icon-help',
            name: '售后服务',
            path: 'order_after-sale'
          }
        ]
      },
      {
        name: '会员',
        sideActive: 0,
        sideMenu: [
          { icon: 'el-icon-user', name: '会员列表', path: 'user' },
          { icon: 'el-icon-user', name: '会员等级', path: 'user_user-level' }
        ]
      },
      {
        name: '设置',
        sideActive: 0,
        sideMenu: [
          { icon: 'el-icon-setting', name: '基础设置', path: 'setting_base' },
          {
            icon: 'el-icon-setting',
            name: '物流设置',
            path: 'setting_express'
          },
          {
            icon: 'el-icon-setting',
            name: '管理员设置',
            path: 'setting_manager'
          },
          {
            icon: 'el-icon-setting',
            name: '支付设置',
            path: 'setting_trade'
          },
          { icon: 'el-icon-setting', name: '测试页', path: 'test' }
        ]
      }
    ]
  }
}
