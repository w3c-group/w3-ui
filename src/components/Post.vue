<template>
  <div class="post">
    <sl-textarea placeholder="将上链存证，请认真对待，支持Markdown格式"></sl-textarea>

    <div class="single mt-1">
      <span class="gray">
        已输入0字
        <a> 长文 </a>|
        <a> @提及 </a>
      </span>
      <sl-button type="primary" v-if="canPub">发布</sl-button>
      <sl-button type="primary" v-else disabled>即将开放</sl-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['canPub']
}
</script>

<style lang="scss">
.post {
}
</style>
