import axios from './base'

export default {
  mixinAuth(payload) {
    return axios.post('/un/mixin/auth', axios.qs.stringify(payload))
  },
  sendMsgCode(payload) {
    return axios.post('/un/phone/code', axios.qs.stringify(payload))
  },
  phoneLogin(payload) {
    return axios.post('/un/phone/login', axios.qs.stringify(payload))
  },
  changePhone(payload) {
    return axios.post('/user/phone', axios.qs.stringify(payload))
  }
}
