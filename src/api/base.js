/* eslint-disable */
import axios from 'axios'
import store from '@/store'

import qs from 'qs'

axios.qs = qs
axios.defaults.timeout = 30000

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? 'https://wg.isdot.net/api' : 'http://192.168.1.7:8181/api'

axios.interceptors.request.use(
  function(config) {
    const token = store.state.user && store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (config.method === 'post') {
      config.headers['Content-Type'] = `application/x-www-form-urlencoded`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    if (!response) return
    const data = response.data
    return data
  },
  err => {
    const e = new Error(err)
    const code = parseInt(String(e).split('code ')[1]) || 0
    if (code === 401) {
      localStorage.clear()
      localStorage.FROM_W3 = true
      location.href = '/login'
      return
    }
    // if (code === 403) {
    //   message = "you don't have permission to access this resource"
    // }
    return {
      code
    }
  }
)

export default axios
