import Vue from 'vue'
import Vuex from 'vuex'

import plugins from './plugins'

Vue.use(Vuex)

let wm = {}
let user = {}

try {
  user = JSON.parse(localStorage.WM_USER)
} catch (error) {
  console.log('')
}
try {
  wm = JSON.parse(localStorage.WM)
} catch (error) {
  console.log('')
}

export default new Vuex.Store({
  state: {
    wm,
    user,
    searchInput: ''
  },
  mutations: {
    setUser: (state, { data }) => {
      state.user = data
    },
    setSearchInput: (state, { data }) => {
      state.searchInput = data
    }
  },
  actions: {},
  modules: {},
  plugins
})
