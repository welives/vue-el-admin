'use strict'

import Vue from 'vue'
import axios from 'axios'
import { Message, Loading } from 'element-ui'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const service = axios.create(config)
let loading = false

// 请求拦截
service.interceptors.request.use(
  (config) => {
    if (config.token === true) {
      config.headers['token'] = sessionStorage.getItem('token')
    }
    loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.5)'
    })
    return config
  },
  (error) => {
    loading.close()
    Message.error(error.message)
    console.log('request error:', error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    loading.close()
    const res = response.data
    if (res.code !== 20000) {
      Message.error(res.msg)
      return Promise.reject('error')
    } else {
      Message.success(res.msg)
      return response
    }
  },
  (error) => {
    loading.close()
    if (
      error.response &&
      error.response.data &&
      error.response.data.errorCode
    ) {
      Message.error(error.response.data.msg)
    }
    console.log('response error:', error)
    return Promise.reject(error)
  }
)

Plugin.install = (Vue, options) => {
  Vue.axios = service
  window.axios = service
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return service
      }
    },
    $axios: {
      get() {
        return service
      }
    }
  })
}

Vue.use(Plugin)

export default service
