import Mock from 'mockjs'
import { get } from '@/utils/auth'

const base = Mock.mock({
  access: {
    'isReg|1-2': false,
    'regType|1': ['normal', 'email', 'phone'],
    passLen: '@integer(6,12)',
    passEncrypt: ['number', 'lower'],
  },
  upload: {
    'uploadType|1': ['local', 'aliyun'],
    uploadConfig: function() {
      if (this.uploadType === 'local') {
        return {
          bucket: '',
          accessKey: '',
          secretKey: '',
          domain: '',
        }
      } else {
        return {
          bucket: Mock.mock('@guid'),
          accessKey: Mock.mock('@string(64,128)'),
          secretKey: Mock.mock('@string(64,128)'),
          domain: Mock.mock('@url("https","aliyun.com")'),
        }
      }
    },
  },
  security: {
    'apiGuard|1-2': false,
    apiKey: '@string(64,128)',
  },
})

function getBase(request) {
  const { token } = JSON.parse(request.body)
  if (token && get('token', false) !== token) {
    return { code: 20002, msg: '非法操作' }
  }
  return { code: 20000, base }
}

export { getBase }
