<template>
  <div class="avatar-list">
    <div class="wrapper">
      <div class="inner">
        <router-link to="/user/12" class="item" v-for="i in list" :key="i"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style lang="scss">
.avatar-list {
  max-width: 100%;
  overflow: scroll;
  position: relative;
  display: block;
  height: 4rem;
  .wrapper {
    position: absolute;
    display: block;
    width: initial;
  }
  .inner {
    display: flex;
    flex-direction: row-reverse;
    padding: 0 0.6rem;
    .item {
      background: var(--sl-color-gray-90);
      width: 3rem;
      height: 3rem;
      margin-left: -0.6rem;
      border-radius: 50%;
      border: 0.2rem solid #fff;
      flex-shrink: 0;
    }
  }
}
</style>
