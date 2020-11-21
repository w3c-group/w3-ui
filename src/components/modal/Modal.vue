<template>
  <div>
    <sl-dialog :label="dialogLabel" class="dialog-overview">
      <div v-if="dialogContent === 'download'">
        <div class="qrcode">
          <!-- https://download.exin.one/#/ -->
          <!-- #3a71c6 -->
          <div class="item">
            <img width="160" class="sm-hide" :src="qrcode.apk" v-if="qrcode.apk" alt />
            <a :href="download.apk" target="_blank" rel="noopener noreferrer">
              <sl-button type="primary" class="sm-show">安卓</sl-button>
              <span class="sm-hide">安卓</span>
            </a>
          </div>
          <div class="item">
            <img width="160" class="sm-hide" :src="qrcode.ios" v-if="qrcode.ios" alt />
            <a :href="download.ios" target="_blank" rel="noopener noreferrer">
              <sl-button type="primary" class="sm-show">iOS</sl-button>
              <span class="sm-hide">iOS</span>
            </a>
          </div>
        </div>
        <div class="hr"></div>
        <div>
          打开方式: 搜索添加联系人
          <b>7000102461</b>，发送任意消息即可
        </div>
      </div>
      <div v-else-if="dialogContent === 'showMsg'">
        <div>消息即将上线，敬请期待</div>
      </div>
      <div v-else-if="dialogContent === 'changePhone'">
        <div>
          <sl-input class="mb-2" v-sl-model="input0" placeholder="请输入原手机号">
            <span class="gray" slot="prefix">+86</span>
          </sl-input>
          <sl-input class="mb-2" v-sl-model="input1" placeholder="请输入新手机号">
            <span class="gray" slot="prefix">+86</span>
          </sl-input>
          <sl-input v-sl-model="input2" placeholder="验证码">
            <small class="gray" v-if="sendMsgDisable > 0" slot="suffix">{{ sendMsgDisable }}S</small>
            <a v-else type="primary" @click.stop="sendMsgCode('change')" slot="suffix">发送</a>
          </sl-input>
          <div class="mt-2 ml-2 danger" v-if="noticeTip">提示: {{ noticeTip }}</div>
        </div>
      </div>
      <div v-else-if="dialogContent === 'mobileLogin'">
        <div>
          <div class="mb-2">
            新用户登录即为注册，视为同意
            <a href="https://w3c.group/service" target="_blank" rel="noopener noreferrer">w3c社区协议</a>
          </div>
          <sl-input class="mb-2" v-sl-model="input1" placeholder="请输入手机号">
            <span class="gray" slot="prefix">+86</span>
          </sl-input>
          <sl-input v-sl-model="input2" placeholder="验证码">
            <small class="gray" v-if="sendMsgDisable > 0" slot="suffix">{{ sendMsgDisable }}S</small>
            <a v-else type="primary" @click.stop="sendMsgCode('login')" slot="suffix">发送</a>
          </sl-input>
          <div class="mt-2 ml-2 danger" v-if="noticeTip">提示: {{ noticeTip }}</div>
        </div>
      </div>
      <div v-else-if="dialogContent === 'uploadImage'">
        <div>
          <MyUpload
            :url="ossSignData.host"
            field="img"
            selfKey="1"
            :only-single="true"
            :only-img="true"
            :params="ossSignData"
            @uploadSuccess="uploadImageSuccess"
            @uploadFail="uploadImageFail"
          />
        </div>
      </div>
      <div v-else>
        <div v-html="dialogContent"></div>
      </div>
      <sl-button slot="footer" class="close-btn" v-show="dialogCloseBtn">{{ dialogCloseBtn || '关闭' }}</sl-button>
      <sl-button
        slot="footer"
        class="confirm-btn"
        v-show="dialogConfirmBtn"
        @click.stop="confirmCallbackAction"
        type="primary"
        >{{ dialogConfirmBtn }}</sl-button
      >
    </sl-dialog>
  </div>
</template>

<script>
import { qrcanvas } from 'qrcanvas'
import userApi from '@/api/user'
import MyUpload from '@/components/MyUpload.vue'

export default {
  data() {
    return {
      dialogContent: '',
      dialogLabel: '提示',
      dialogCloseBtn: '',
      dialogConfirmBtn: '',
      confirmCallback: null,
      ossSignData: {},
      download: {
        ios: 'https://apps.apple.com/cn/app/id1457938019',
        apk: 'https://assets.exincdn.com/mixin/android/260600-1.apk'
      },
      qrcode: {
        ios: '',
        apk: ''
      },
      codeSending: false,
      historyTab: '',
      historyList: [],
      earnDetailList: [],
      input0: '',
      input1: '',
      input2: '',
      payload: {},
      curOwnerDesc: '',
      hasPinToTop: false,
      noticeTip: '',
      sendMsgDisable: 0,
      sendMegInterval: null,
      auctionReceive: '',
      shipInfo: '',
      noticePrice: 0
    }
  },
  computed: {
    payInfo() {
      try {
        return JSON.parse(this.payload.payInfo)
      } catch (error) {
        return {}
      }
    }
  },
  watch: {
    input1() {
      this.noticeTip = ''
    },
    input2() {
      this.noticeTip = ''
    }
  },
  components: {
    MyUpload
  },
  mounted() {
    const ios = qrcanvas({
      data: this.download.ios
    })
    this.qrcode.ios = ios.toDataURL()
    const apk = qrcanvas({
      data: this.download.apk
    })
    this.qrcode.apk = apk.toDataURL()

    let dialogTimer = null

    const dialog = document.querySelector('.dialog-overview')
    const closeButton = dialog.querySelector('.close-btn')
    const confirmButton = dialog.querySelector('.confirm-btn')
    closeButton.addEventListener('click', () => dialog.hide())
    confirmButton.addEventListener('click', () => {
      dialog.hide()
    })
    this.$root.$on('show-modal', (data) => {
      this.sendMsgDisable = sessionStorage.sendMsgDisable - 0
      if (this.sendMsgDisable > 0) {
        this.initSendMsg(this.sendMsgDisable)
      }

      const { text, label, closeAfter, confirm, close, confirmCallback, input0, input1, input2, payload } = data

      this.payload = payload
      if (payload) {
        this.curOwnerDesc = payload.ownerDesc
        this.noticePrice = payload.noticePrice
      }
      this.hasPinToTop = false

      this.confirmCallback = confirmCallback
      this.input0 = input0
      this.input1 = input1
      this.input2 = input2

      this.dialogLabel = label
      this.dialogContent = text
      this.dialogConfirmBtn = confirm
      this.dialogCloseBtn = close

      if (closeAfter) {
        dialogTimer = setTimeout(() => {
          dialog.hide()
        }, closeAfter)
      } else {
        clearTimeout(dialogTimer)
      }

      if (this.dialogContent === 'uploadImage') {
        this.initAuctionImageOss()
      }
    })
  },
  methods: {
    uploadImageSuccess(res) {
      console.log(res)
    },
    uploadImageFail(key) {
      const dialog = document.querySelector('.dialog-overview')
      dialog.hide()
      if (this.confirmCallback) {
        this.confirmCallback(`https://wm-bucket.oss-cn-hangzhou.aliyuncs.com/${key}`)
      }
    },
    sendMsgCode(type) {
      if (sessionStorage.sendMsgDisable > 0 || this.codeSending) return
      this.codeSending = true
      const phone = this.input1
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        this.noticeTip = '手机号输入有误'
        this.codeSending = false
        return
      }
      userApi
        .sendMsgCode({ phone, type })
        .then((res) => {
          this.codeSending = false
          if (res.data) {
            this.initSendMsg(59)
          }
          if (res.err) {
            this.noticeTip = res.err
          }
        })
        .catch(() => {
          this.codeSending = false
        })
    },
    initSendMsg(before) {
      sessionStorage.sendMsgDisable = before
      this.sendMsgDisable = before
      clearTimeout(this.sendMegInterval)
      this.sendMegInterval = setInterval(() => {
        const sec = sessionStorage.sendMsgDisable - 1
        sessionStorage.sendMsgDisable = sec
        this.sendMsgDisable = sec
        if (sec <= 0) {
          clearTimeout(this.sendMegInterval)
        }
      }, 1000)
    },
    chooseSymbolAction(symbol) {
      if (this.confirmCallback) {
        this.confirmCallback({ symbol })
        const dialog = document.querySelector('.dialog-overview')
        dialog.hide()
      }
    }
  },

  beforeDestroy() {
    this.$root.$off('show-modal')
  }
}
</script>

<style lang="scss" scoped>
.dialog-overview::part(close-button) {
  padding: 0 0.5rem;
}
.dialog-overview::part(close-button) {
  padding: 0 0.35rem;
}
.dialog-overview::part(title) {
  white-space: nowrap;
  overflow: hidden;
  padding-bottom: 0;
  padding-right: 0;
  text-overflow: ellipsis;
}
.qrcode {
  display: flex;
  padding: 0 2rem;
  .item {
    display: flex;
    width: 50%;
    align-items: center;
    flex-direction: column;
    img {
      opacity: 0.9;
    }
    a {
      padding: 0.5rem;
    }
  }
}
.invite-group {
  width: 100%;
}
.invite-group::part(base) {
  display: flex;
}
.invite-input {
  margin-right: -0.1rem;
  flex: 1;
}

.hr {
  height: 1px;
  background: var(--sl-color-gray-90);
  margin: 0.5rem 0 1rem;
}
.on {
  background: #ebf1fa;
}
.dialog-overview::part(header) {
  user-select: none;
}
.dialog-overview::part(footer) {
  text-align: center;
  padding-top: 0;
}
.goods-detail {
  .img {
    text-align: center;
    margin-bottom: 1rem;
    img {
      border-radius: var(--sl-border-radius-medium);
    }
  }
}
.choose-symbol {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: #f8f8f8;
  border-radius: var(--sl-border-radius-medium);
  margin: 0.2rem;
  &.on {
    background: #dfecff;
  }
}
</style>
