export default {
  logo: 'ADMIN',
  navBar: {
    active: 0,
    list: [
      {
        title: '首页',
        sideActive: 0,
        sideMenu: [
          { icon: 'el-icon-s-home', title: '后台首页', path: 'index' },
          // { icon: 'el-icon-s-order', title: '商品列表', path: 'shop_goods' },
          { icon: 'el-icon-picture', title: '相册管理', path: 'image' },
        ],
      },
      {
        title: '商品',
        sideActive: 0,
        sideMenu: [
          { icon: 'el-icon-s-shop', title: '商品列表', path: 'shop_goods' },
          { icon: 'el-icon-s-data', title: '商品分类', path: 'shop_category' },
          {
            icon: 'el-icon-s-management',
            title: '商品规格',
            path: 'shop_spec',
          },
          {
            icon: 'el-icon-s-management',
            title: '商品类型',
            path: 'shop_type',
          },
          { icon: 'el-icon-document', title: '商品评论', path: 'shop_comment' },
        ],
      },
      {
        title: '订单',
        sideActive: 0,
        sideMenu: [
          { icon: 'el-icon-s-order', title: '订单列表', path: 'order' },
          { icon: 'el-icon-tickets', title: '发票列表', path: 'order_invoice' },
          {
            icon: 'el-icon-help',
            title: '售后服务',
            path: 'order_after-sale',
          },
        ],
      },
      {
        title: '会员',
        sideActive: 0,
        sideMenu: [
          { icon: 'el-icon-user', title: '会员列表', path: 'user' },
          { icon: 'el-icon-user', title: '会员等级', path: 'user_user-level' },
        ],
      },
      {
        title: '设置',
        sideActive: 0,
        sideMenu: [
          { icon: 'el-icon-setting', title: '基础设置', path: 'setting_base' },
          {
            icon: 'el-icon-setting',
            title: '物流设置',
            path: 'setting_express',
          },
          {
            icon: 'el-icon-setting',
            title: '管理员设置',
            path: 'setting_manager',
          },
          {
            icon: 'el-icon-setting',
            title: '支付设置',
            path: 'setting_trade',
          },
          { icon: 'el-icon-setting', title: '测试页', path: 'test' },
        ],
      },
    ],
  },
}
