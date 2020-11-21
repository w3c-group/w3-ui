import axios from './base'

export default {
  getPriceMap() {
    return axios.get('/common/price/map')
  }
}
