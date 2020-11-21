<template>
  <div class="not-found">
    <div class="container">
      <div class="wrapper">
        <div class="text">T_T 页面暂不可见</div>
        <sl-button type="primary" @click.stop="goHome">前往首页</sl-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/hall')
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  .wrapper {
    .text {
      font-size: 1.35rem;
      padding: 1rem 0;
    }
    margin: 3rem auto;
    padding: 10rem 1rem;
  }
}
</style>
