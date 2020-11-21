import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import ShoelaceModelDirective from '@/components/vue-sl-model'
import VueLazyload from 'vue-lazyload'
import Photoswipe from 'vue-pswipe'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueLazyload)
Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^sl-/]
Vue.use(ShoelaceModelDirective)

Vue.use(Photoswipe, {})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
