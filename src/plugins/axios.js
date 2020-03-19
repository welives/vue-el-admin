'use strict'

import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const service = axios.create(config)

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 以后改用请求后端时打开这里的注释在请求头加上token
    // if (config.token === true) {
    //   config.headers['token'] = Vue.prototype.$cookie.get('token')
    // }
    return config
  },
  (error) => {
    Message.error(error.message)
    console.log('request error:', error) // for debug
    return Promise.reject(error)
  },
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.code !== 20000) {
      Message.error(data.msg)
      return Promise.reject('error')
    } else {
      data.msg ? Message.success(data.msg) : ''
      return response
    }
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errorCode
    ) {
      Message.error(error.response.data.msg)
    }
    console.log('response error:', error) // for debug
    return Promise.reject(error)
  },
)

Plugin.install = (Vue, options) => {
  window.axios = service
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return service
      },
    },
  })
}

Vue.use(Plugin)

export default service
