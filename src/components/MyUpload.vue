<template>
  <div class="vue-upload-file" v-show="value">
    <div
      class="vuf-drop-area"
      :class="{hover}"
      @click.stop="handleClick"
      @dragleave="handleDragleave"
      @dragover="handleDragover"
      @dragenter="handleDragenter"
      @drop="handleDrop"
    >
      <span class="vuf-hint" v-show="loading !== 1">{{ lang.hint }}</span>
      <span class="vuf-loading" v-show="loading === 1">{{ lang.loading }}</span>
      <div class="vuf-progress-wrap" v-show="loading === 1">
        <span class="vuf-progress" :style="progressStyle"></span>
      </div>
      <span class="vuf-no-supported-hint" v-show="!isSupported">{{ lang.noSupported }}</span>
      <input
        autocomplete="off"
        spellcheck="false"
        type="file"
        id="input"
        v-show="false"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script>
// import crypto from "../assets/crypto";
import BMF from 'browser-md5-file'

const bmf = new BMF()

/* eslint-disable */
export default {
  props: {
    // 域，上传文件name，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
    field: {
      type: String,
      default: 'upload'
    },
    // 类似于id，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
    selfKey: {
      default: 0
    },
    // 显示该控件与否
    value: {
      default: true
    },
    url: {
      type: String,
      default: ''
    },
    // 其他要上传文件附带的数据，对象格式
    params: {
      default: null
    },
    // 单文件大小限制
    maxSize: {
      default: 2048
    },
    // 仅限图片
    onlyImg: {
      default: false
    },
    // 仅限单文件上传
    onlySingle: {
      default: false
    },
    // 语言包
    langType: {
      type: String,
      default: 'zh'
    },
    // 语言扩展
    langExt: {
      type: Object,
      default: null
    }
  },
  data() {
    let uploadType = '文件'
    let uploadFileSize = '，文件大小不超过200MB'
    if (this.onlyImg) {
      uploadType = '图片'
      uploadFileSize = ''
    }
    let that = this,
      { langExt, langType } = that,
      isSupported = true,
      langBags = {
        zh: {
          hint: `点击或将${uploadType}拖动至此处上传` + uploadFileSize,
          loading: '正在上传……',
          noSupported: '浏览器不支持该功能，请使用IE10以上或其他现代浏览器！',
          success: '',
          fail: '',
          error: {
            onlyImg: `仅限jpg或png${uploadType}格式`,
            onlySingle: '仅限单文件上传',
            outOfSize: `${uploadType}大小不能超过`
          }
        }
      },
      lang = langBags[langType] ? langBags[langType] : langBags['zh']
    if (langExt) {
      Object.assign(lang, langExt)
    }
    if (typeof FormData != 'function') {
      isSupported = false
    }
    return {
      loading: 0, //0未开始 1正在 2成功 3错误
      lang,
      isSupported,
      hasError: false,
      files: '',
      progress: 0,
      errorMsg: '',
      hover: false
    }
  },
  computed: {
    progressStyle() {
      let { progress } = this
      return {
        width: progress + '%'
      }
    }
  },
  watch: {
    hasError: function () {
      // this.$root.$emit('show-toast', this.errorMsg)
      this.hasError = false
    },
    value: function (newValue) {
      if (newValue) {
        this.reset()
      }
    }
  },
  methods: {
    handleDragleave(e) {
      this.hover = false
      e.preventDefault()
    },
    handleDrop(e) {
      this.hover = false
      e.preventDefault()
      if (this.loading !== 1) {
        let files = e.dataTransfer.files
        this.reset()
        if (this.checkFiles(files)) {
          this.upload(files)
        }
      }
    },
    handleDragenter(e) {
      e.preventDefault()
    },
    handleDragover(e) {
      this.hover = true
      e.preventDefault()
    },
    handleClick(e) {
      if (this.loading !== 1) {
        document.getElementById('input').click()
        // e.preventDefault();
      }
    },
    handleChange(e) {
      if (this.loading !== 1) {
        let files = e.target.files
        this.reset()
        if (this.checkFiles(files)) {
          this.upload(files)
        }
      }
    },
    checkFiles(files) {
      let that = this,
        { lang, maxSize, onlyImg, onlySingle } = that,
        fileNum = files.length
      // 是否文件为空
      if (fileNum == 0) {
        return false
      }
      // 仅限单文件？
      if (onlySingle && fileNum > 1) {
        that.hasError = true
        that.errorMsg = lang.error.onlySingle
        return false
      }
      for (let i = 0; i < fileNum; i++) {
        // 仅限图片
        if (onlyImg && files[i].type.indexOf('image/png') === -1 && files[i].type.indexOf('image/jp') === -1) {
          that.hasError = true
          that.errorMsg = lang.error.onlyImg
          return false
        }
        // 超出大小
        if (files[i].size / 1024 / 1024 > maxSize) {
          that.hasError = true
          that.errorMsg = lang.error.outOfSize + maxSize + 'MB'
          return false
        }
      }
      return true
    },
    reset() {
      let that = this
      that.loading = 0
      that.hasError = false
      that.errorMsg = ''
      that.progress = 0
    },
    upload(files) {
      let that = this,
        { url, params, onlySingle, field, selfKey, lang } = this,
        fmData = new FormData()

      const { accessid, policy, signature, dir, callback } = params
      // 参考原始后缀
      // const oldTypePiece = files[0].name.split('.')
      // const oldType = oldTypePiece[oldTypePiece.length - 1]
      // let type = files[0].type.split('/')[1]
      // if (/\./.test(type)) {
      //     type = oldType
      // }
      const tStr = new Date().getTime()
      const pieces = files[0].name.split('.')

      if (this.onlyImg && files[0].size / 1024 > 4 * 1024) {
        return this.$root.$emit('show-toast', {text: '图片大小不能超过4MB'})
      }
      if (!this.onlyImg && files[0].size / 1024 > 200 * 1024) {
        return this.$root.$emit('show-toast', {text: '文件大小不能超过200MB'})
      }

      // 上传文件
      that.loading = 1

      bmf.md5(
        files[0],
        (err, md5) => {
          // let nameStr = crypto.Encrypt(
          //   `${files[0].lastModified},${files[0].size},${files[0].type},${
          //     files[0].name
          //   }`
          // );
          // 根据实际的文件hash进行命名
          let nameStr = md5
          const key = `${dir}${nameStr.substr(0, 16)}.${pieces[pieces.length - 1]}`

          fmData.append('OSSAccessKeyId', accessid)
          fmData.append('policy', policy)
          fmData.append('signature', signature)
          // 文件上传时设置为下载
          if (!this.onlyImg) {
            fmData.append('Content-Disposition', `attachment;filename="${files[0].name}"`)
          }
          fmData.append('key', key)
          fmData.append('success_action_status', 200)
          fmData.append('callback', callback)
          fmData.append('file', files[0], `${files[0].name}`)

          // if (this.onlyImg) {
          //   console.log('uploadImg', key)
          // }

          // // 判断是否单文件
          // if (onlySingle) {
          //     fmData.append(field, files[0]);
          // } else {
          //     fmData.append(field, files);
          // }
          // // 添加其他参数
          // if (typeof params == 'object' && params) {
          //     Object.keys(params).forEach((k) => {
          //         fmData.append(k, params[k]);
          //     })
          // }
          // 监听进度回调
          const uploadProgress = function (event) {
            if (event.lengthComputable) {
              that.progress = (100 * Math.round(event.loaded)) / event.total
              if (that.progress >= 100) {
                // 通知父级
                that.$root.$emit('readPatch', {
                  key,
                  size: files[0].size
                })
              }
            }
          }
          new Promise(function (resolve, reject) {
            let client = new XMLHttpRequest()
            client.open('POST', url, true)
            client.onreadystatechange = function () {
              if (this.readyState !== 4) {
                return
              }
              if (this.status === 200) {
                resolve(this.responseText)
              } else {
                reject(this.responseText)
              }
            }
            client.upload.addEventListener('progress', uploadProgress, false) //监听进度
            client.send(fmData)
          }).then(
            // 上传成功
            function (resData) {
              that.loading = 2
              that.$emit('uploadSuccess', files[0].name, files[0].size, key)
            },
            // 上传失败
            function (sts) {
              that.loading = 3
              that.hasError = true
              that.errorMsg = lang.fail
              let size = files[0].size
              let type = 'KB'
              if (size / 1024 >= 1024) {
                size = size / 1024
                type = 'MB'
              }
              that.$emit('uploadFail', key)
            }
          )
        },
        (progress) => {
          // console.log('progress number:', progress);
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes vue_upload_progress {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 10px 0;
  }
}
@keyframes vue_upload {
  0% {
    opacity: 0;
    // transform: scale(0) translatey(-60px);
  }
  100% {
    opacity: 1;
    // transform: scale(1) translatey(0);
  }
}
.vue-upload-file {
  display: block;
  box-sizing: border-box;
  z-index: 999;
  left: 2rem;
  right: 2rem;
  background-color: #fff;
  animation: vue_upload 0.15s ease-in;
  .vuf-drop-area {
    position: relative;
    padding: 30px 10px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.03);
    text-align: center;
    border: 1px dashed #ddd; // 上传图标
    .vuf-hint {
      font-size: 14px;
      color: #888;
      line-height: 30px;
    }

    .vuf-loading {
      font-size: 16px;
      color: #888;
      line-height: 30px;
    }

    .vuf-progress-wrap {
      display: block;
      background-color: rgba(#000, 0.14);

      .vuf-progress {
        position: relative;
        margin-top: 12px;
        display: block;
        height: 3px;
        background-color: #4a7;
        box-shadow: 0 1px 3px 0 rgba(#4a7, 0.3);
        transition: width 0.5s ease;
        background-image: linear-gradient(
          -45deg,
          rgba(#fff, 0.2) 25%,
          transparent 25%,
          transparent 50%,
          rgba(#fff, 0.2) 50%,
          rgba(#fff, 0.2) 75%,
          transparent 75%,
          transparent
        );
        background-size: 10px 10px;
        animation: vue_upload_progress 0.3s linear infinite;

        &::after {
          content: '';
          position: absolute;
          display: block;
          top: -2px;
          right: -2px;
          width: 5px;
          height: 5px;
          border: 1px solid rgba(#fff, 0.6);
          box-shadow: 0 1px 4px 0 rgba(#4a7, 0.7);
          border-radius: 100%;
          background-color: #4a7;
        }
      }
    }

    .vuf-no-supported-hint {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 0;
      width: 100%;
      height: 60px;
      line-height: 30px;
      background-color: #eee;
      text-align: center;
      color: #888;
      font-size: 14px;
    }

    &:hover,
    &.hover {
      cursor: pointer;
      border-color: #ccc;
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>