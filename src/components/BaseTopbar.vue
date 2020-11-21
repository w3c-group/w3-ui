<template>
  <div class="topbar">
    <div class="topbar-in" :class="{ mixin: this.$root.InMixin }">
      <div class="info">
        <router-link to="/hall">
          <img src="../assets/logo.svg" />
        </router-link>
        <Navigator class="sm-hide" />
      </div>

      <router-link class="avatar" to="/user/panel"> </router-link>
    </div>
  </div>
</template>

<script>
import Navigator from '@/components/Navigator.vue'

export default {
  components: {
    Navigator
  },
  mounted() {
    // // mixin check
    // if (!this.$store.state.user.mixin) {
    //   this.$root.$emit('show-toast', {
    //     text: '请先使用Mixin登录',
    //     confirmCallback: () => {
    //       window.location.href = '/login'
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.topbar {
  user-select: none;
  &::before {
    content: '';
    display: block;
    height: var(--sl-spacing-xxxx-large);
    padding-bottom: 1px;
  }
  .topbar-in {
    position: fixed;
    display: flex;
    border-bottom: 1px solid #eee;

    justify-content: space-between;
    padding: 0 var(--sl-spacing-xx-large);
    align-items: center;
    height: var(--sl-spacing-xxxx-large);

    backdrop-filter: saturate(180%) blur(20px);
    background-color: rgba(255, 255, 255, 0.72);
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--sl-z-index-drawer);

    @media (max-width: 760px) {
      // border: none;
      backdrop-filter: initial;
      background-color: #fff;
      padding: 0 var(--sl-spacing-medium);
    }
    &.mixin {
      justify-content: initial;
    }
    .avatar {
      margin-left: 1rem;
    }

    .info {
      display: flex;
      align-items: center;

      img {
        height: 1.6rem;
      }
      .text {
        font-size: 0.9rem;
        padding-left: 0.1rem;
        color: var(--sl-color-gray-50);
      }
    }
    .group {
      display: flex;
      align-items: center;
    }
  }
}
</style>
