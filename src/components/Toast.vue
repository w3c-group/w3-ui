<template>
  <div>
    <sl-dialog label class="toast-overview">
      <div v-html="content"></div>
      <sl-button slot="footer" class="close-btn" v-show="confirmCallback" @click.stop="confirmCallback">确认</sl-button>
    </sl-dialog>
  </div>
</template>

<script>
let timer = null
export default {
  data() {
    return {
      content: '',
      confirmCallback: null
    }
  },
  mounted() {
    const toast = document.querySelector('.toast-overview')

    const closeButton = document.querySelector('.close-btn')
    closeButton.addEventListener('click', () => {
      toast.hide()
      if (this.confirmCallback) {
        this.confirmCallback()
      }
    })

    this.$root.$on('show-toast', (payload) => {
      const { text, sec, confirmCallback } = payload
      this.content = text
      this.confirmCallback = confirmCallback
      setTimeout(() => {
        toast.show()
        clearTimeout(timer)
        if (sec) {
          timer = setTimeout(() => {
            if (toast) {
              toast.hide()
            }
          }, sec)
        }
      }, 200)
    })
  },

  beforeDestroy() {
    this.$root.$off('show-toast')
  }
}
</script>

<style lang="scss" scoped>
.toast-overview::part(header) {
  height: 3rem;
}
.toast-overview::part(close-button) {
  padding: 0 0.35rem;
}
.toast-overview::part(body) {
  padding-top: 0;
  // padding-bottom: 3rem;
}
.toast-overview::part(footer) {
  text-align: center;
  padding-top: 0;
}
</style>
