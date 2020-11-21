<template>
  <router-link to="/user/12" class="userinfo">
    <div class="avatar"></div>
    <div class="info">
      <div class="name">jim</div>

      <!-- 发表于 2020-11-15 17:02:26 -->
      <div class="gray">8分钟前</div>
       <!-- · 发布动态 -->
    </div>
  </router-link>
</template>

<script>
export default {}
</script>

<style lang="scss">
.userinfo {
  display: inline-flex;
  .info {
    display: flex;
    margin-left: 0.5rem;
    flex-direction: column;
    line-height: 1.5;
  }
}
</style>
