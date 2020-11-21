<template>
  <div class="navigator">
    <router-link to="/hall">
      <sl-icon name="broadcast"></sl-icon>
      <span>公示</span>
    </router-link>
    <router-link to="/nft">
      <sl-icon name="award"></sl-icon>
      <span>NFT</span>
    </router-link>
    <router-link to="/proposal">
      <sl-icon name="file-earmark-text"></sl-icon>
      <span>提案</span>
    </router-link>
    <router-link to="/list">
      <sl-icon name="check2-square"></sl-icon>
      <span>执行</span>
    </router-link>
    <router-link to="/collect">
      <sl-icon name="layout-wtf"></sl-icon>
      <span>应用</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.navigator {
  // padding-left: var(--sl-spacing-large);
  a {
    display: inline-flex;
    align-items: center;
    margin-left: var(--sl-spacing-xx-large);
    font-size: var(--sl-font-size-large);
    color: var(--sl-color-gray-30);
  }
  a.router-link-active {
    font-weight: normal;
    color: var(--sl-color-primary-45);
  }
  span {
    margin-left: var(--sl-spacing-xx-small);
  }
  &.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: var(--sl-z-index-drawer);
    background: #fff;
    justify-content: space-between;
    border-top: 1px solid #eee;
    padding: var(--sl-spacing-small) 0;
    a {
      width: 20%;
      margin-left: 0;
      display: inline-flex;
      font-size: var(--sl-spacing-x-large);
      color: var(--sl-color-gray-60);
      flex-direction: column;

      &.router-link-active {
        color: var(--sl-color-primary-45);
      }
      span {
        margin-left: 0;
        display: block;
        line-height: 1.5;
        font-size: var(--sl-spacing-small);
      }
    }
  }
}
</style>
