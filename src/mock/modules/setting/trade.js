import Mock from 'mockjs'
import { get } from '@/utils/auth'

const { paymentList } = Mock.mock({
  paymentList: [
    {
      id: 1,
      name: '支付宝支付',
      key: 'alipay',
      desc: '该系统支持即时到账接口',
      src: 'http://wxcs.niuteam.cn/addons/NsAlipay/ico.png',
      status: true,
      payConfig: {
        app_id: '@string(24)',
        ali_public_key: '@string(128)',
        private_key: '@string(128)',
      },
    },
    {
      id: 2,
      name: '微信支付',
      key: 'wxpay',
      desc: '该系统支持微信网页支付和扫码支付',
      src: 'http://wxcs.niuteam.cn/addons/NsWeixinpay/ico.png',
      status: true,
      payConfig: {
        app_id: '@string(24)',
        miniapp_id: '@string(24)',
        secret: '@string(64)',
        appid: '@string(24)',
        mch_id: '@string(24)',
        key: '@string(64)',
        cert_client: '',
        cert_key: '',
      },
    },
  ],
})

const shoppingConfig = {
  close_order_day: '1',
  auto_received_day: '15',
  after_sale_day: '7',
}

function getPaymentList(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, paymentList }
}

function getShoppingConfig(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, shoppingConfig }
}

export { getPaymentList, getShoppingConfig }
