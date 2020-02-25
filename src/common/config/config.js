export default {
  logo: 'UNI-ADMIN',
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
          { icon: 'el-icon-s-order', name: '商品列表', path: 'shop_goods' },
          { icon: 'el-icon-goods', name: '新增商品', path: 'shop_goods_add' }
        ]
      },
      { name: '订单' },
      { name: '会员' },
      {
        name: '设置',
        sideActive: 0,
        sideMenu: [{ icon: 'el-icon-setting', name: '测试页', path: 'test' }]
      }
    ]
  }
}
