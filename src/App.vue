<template>
  <div id="app">
    <div class="app-in">
      <Modal />
      <Toast />
      <BaseTopbar v-if="$route.name !== 'SurveyDetail'" :type="$route.name && $route.name.toLowerCase()" />
      <router-view />
      <div class="footer" v-if="$route.name === 'Panel'">
        <span class="no-wrap">
          Copyright &copy; 2020 -
          <span><a href="https://w3c.group">W3协作组</a> 创造者协作社区</span>
          <br class="sm-show" />
        </span>
      </div>

      <Navigator class="sm-show fixed" />
    </div>
    <go-top :size="50" :right="64" :max-width="200" fg-color="#777" bg-color="#ffffff"></go-top>

    <sl-drawer :label="drawerTypeNameMap[dtSlice[1]]" placement="bottom" class="drawer-placement">
      <div v-if="dtSlice[0] === 'hall'">
        <div v-if="dtSlice[1] === 'filter'">筛选：提案/NFT/执行</div>
        <sl-input v-else placeholder="搜索提案、小组、动态"></sl-input>
      </div>

      <div v-if="dtSlice[0] === 'nft'">
        <div v-if="dtSlice[1] === 'filter'">
          <div>状态：全部/挂单中</div>
          <div>提案类别：WIP/MIP/NIP</div>
          <div>排序：关注度/NFT价格/更新时间</div>
        </div>
        <div v-else>
          <sl-input placeholder="搜索NFT对应提案、小组"> </sl-input>
        </div>
      </div>

      <div v-if="dtSlice[0] === 'p'">
        <div v-if="dtSlice[1] === 'filter'">
          <div>提案类别：WIP/MIP/NIP</div>
          <div>参与度：我参与的/我关注的</div>
          <div>排序：关注度/更新时间</div>
        </div>
        <div v-else>
          <sl-input placeholder="搜索提案或对应小组"> </sl-input>
        </div>
      </div>

      <div v-if="dtSlice[0] === 'list'">
        <div v-if="dtSlice[1] === 'filter'">
          <div>类型：待办/动态</div>
          <div>排序：关注度/更新时间</div>
        </div>
        <div v-else>
          <sl-input placeholder="搜索动态内容"> </sl-input>
        </div>
      </div>
    </sl-drawer>
  </div>
</template>

<script>
import '@shoelace-style/shoelace/dist/shoelace/shoelace.css'
import { defineCustomElements, setAssetPath } from '@shoelace-style/shoelace/dist/custom-elements/index'
import Modal from '@/components/modal/Modal.vue'
import Toast from '@/components/Toast.vue'
import BaseTopbar from '@/components/BaseTopbar.vue'
import Navigator from '@/components/Navigator.vue'
import GoTop from '@inotom/vue-go-top'

import utils from '@/utils'

const { colorRgb, RGB2HSL } = utils

// setAssetPath
setAssetPath(document.currentScript.src)
defineCustomElements()

export default {
  name: 'App',
  components: {
    BaseTopbar,
    Navigator,
    Modal,
    Toast,
    GoTop
  },
  data() {
    return {
      drawer: null,
      drawerType: '',
      drawerTypeNameMap: {
        filter: '筛选/排序',
        search: '搜索'
      }
    }
  },
  computed: {
    dtSlice() {
      return this.drawerType.split('-')
    }
  },
  methods: {
    refresh() {
      console.log('refresh')
    },
    infinite() {
      console.log('infinite')
    }
  },
  created() {
    this.$root.InMixin = false

    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.MixinContext) {
      // return 'iOS';
      const mixin = prompt('MixinContext.getContext()')
      try {
        this.$root.InMixin = JSON.parse(mixin)
      } catch (error) {
        console.log(69, error)
      }
    }
    if (window.MixinContext && window.MixinContext.getContext) {
      // return 'Android';
      const mixin = window.MixinContext.getContext()
      try {
        this.$root.InMixin = JSON.parse(mixin)
      } catch (error) {
        console.log(76, error)
      }
      let inMixinData = {}
      try {
        inMixinData = JSON.parse(this.$root.InMixin)
      } catch (error) {
        console.log(82, error)
      }
      if (inMixinData.platform === 'Desktop') {
        this.$root.InMixin = false
      }
    }

    this.$root.payUrlBase = 'https://mixin.one/pay'

    this.$root.openWindow = (url) => {
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('target', '_blank')
      const id = Math.random()
      a.setAttribute('id', id)
      if (!document.getElementById(id)) document.body.appendChild(a)
      a.click()
    }

    this.$root.getByteLen = (str) => {
      if (!str) {
        return 0
      }
      let len = 0
      for (let i = 0; i < str.length; i += 1) {
        if (str[i].match(/[^\x00-\xff]/gi) !== null) {
          // 判断全角
          // if (str[i].match(/[\u4E00-\u9FA5]/g) != null)  //判断是否为中文
          len += 2
        } else {
          len += 1
        }
      }
      return len
    }
    this.$root.scroll = () => {
      if (window.pageYOffset !== null) {
        // 支持IE9 +
        return window.pageYOffset
      }
      if (document.compatMode === 'CSS1Compat') {
        // 声明了DTD
        return document.documentElement.scrollTop
      }
      return document.body.scrollTop
    }
    this.$root.addStyles = (content) => {
      const styleNode = document.createElement('style')
      styleNode.setAttribute('type', 'text/css')
      styleNode.innerHTML = content
      const headNode = document.querySelector('head')
      headNode.appendChild(styleNode)
    }

    this.$root.setTitleAndDesc = (payload) => {
      setTimeout(() => {
        const { title, desc } = payload
        document.title = title
        const meta = document.getElementsByTagName('meta')
        if (meta.description) {
          meta.description.setAttribute('content', desc)
        }
      })
    }

    this.$root.generateMixinTraceId = () => {
      const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
      return id
    }

    this.$root.playDoneAudio = () => {
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      const audioCtx = window.audioCtx || new AudioContext()
      window.audioCtx = audioCtx
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      oscillator.type = 'sine'
      oscillator.frequency.value = 588
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
      gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01)
      oscillator.start(audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1)
      oscillator.stop(audioCtx.currentTime + 1)
    }

    this.$root.symbolToAssetIdMap = {
      WGT: '6eece248-09db-3417-8f70-767896cf5217',
      BTC: 'c6d0c728-2624-429b-8e0d-d9d19b6592fa',
      ETH: '43d61dcd-e413-450d-80b8-101d5e903357',
      XIN: 'c94ac88f-4671-3976-b60a-09064f1811e8',
      USDT: '815b0b1a-2764-3736-8faa-42d694fa620a',
      USDTETH: '4d8c508b-91c5-375b-92b0-ee702ed2dac5'
    }
    this.$root.symbolNameMap = {
      WGT: 'WGT',
      BTC: 'BTC',
      ETH: 'ETH',
      XIN: 'XIN',
      USDT: 'USDT(Omni)',
      USDTETH: 'USDT(ERC20)'
    }
    this.$root.symbolList = ['WGT', 'BTC', 'ETH', 'XIN', 'USDT', 'USDTETH']
    this.$root.assetIdToSymbolMap = {
      '6eece248-09db-3417-8f70-767896cf5217': 'WGT',
      'c6d0c728-2624-429b-8e0d-d9d19b6592fa': 'BTC',
      '43d61dcd-e413-450d-80b8-101d5e903357': 'ETH',
      'c94ac88f-4671-3976-b60a-09064f1811e8': 'XIN',
      '815b0b1a-2764-3736-8faa-42d694fa620a': 'USDT',
      '4d8c508b-91c5-375b-92b0-ee702ed2dac5': 'USDTETH'
    }
  },
  mounted() {
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    this.drawer = document.querySelector('.drawer-placement')
    this.$root.$on('drawer-show', (type) => {
      if (type) {
        this.drawerType = type
        this.drawer.show()
      } else {
        this.drawer.hide()
      }
    })
    gtag('js', new Date())
    gtag('config', 'UA-121610310-1')
    window.addEventListener('load', () => {
      const s = document.createElement('script')
      s.src = 'https://www.googletagmanager.com/gtag/js?id=UA-121610310-1'
      document.body.appendChild(s)
    })
  }
}
</script>

<style lang="scss">
@import './assets/common';
</style>
