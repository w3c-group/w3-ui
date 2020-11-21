<template>
  <div class="container">
    <div class="main-card">
      <h3>
        <span>
          用户概览
          <small>
            <a @click.stop="goBack" v-if="$route.params.id !== 'panel'"
              ><sl-icon class="back-icon" name="arrow-90deg-left"></sl-icon>
              上一页
            </a>
          </small>
        </span>
        <a href="/usr" target="_blank" v-if="$route.params.id === 'panel'"> <sl-button>用户主页</sl-button></a>
        <span v-else>
          <sl-button class="ml-2">关注</sl-button>
        </span>
      </h3>
      <div class="p user-info text-center">
        <div class="mb-2">
          <div class="single center">
            <span class="avatar mr-2"></span> <b>jim</b>
            <a class="ml-2" v-if="$route.params.id !== 'panel'" href="mixin://users/xxx" target="_blank">私信</a>
          </div>
        </div>
        <div class="mb-2 gray"><a>粉丝 0</a> | <a>关注 0</a></div>
        <div class="gray">
          <span class="mr-2">提案 0</span>
          <span class="mr-2">讨论 0</span>
          <span class="mr-2">执行 0</span>
        </div>
      </div>
      <div v-if="$route.params.id !== 'panel'">
        <h3>
          <span>公开的NFT <span class="gray">3</span></span>
        </h3>
        <p>
          <router-link to="/nft/123"><sl-tag class="mr-2" size="small">WIP-11#12</sl-tag> </router-link>
          <router-link to="/nft/123"><sl-tag class="mr-2" size="small">WIP-11#12</sl-tag> </router-link>
          <router-link to="/nft/123"><sl-tag class="mr-2" size="small">WIP-11#12</sl-tag> </router-link>
        </p>
      </div>
      <div v-else>
        <h3>
          <span>持有的NFT <span class="gray">3</span></span>
        </h3>
        <p>
          <router-link to="/nft/123"><sl-tag class="mr-2" size="small">WIP-11#12</sl-tag> </router-link>
          <router-link to="/nft/123"><sl-tag class="mr-2" size="small">WIP-11#12</sl-tag> </router-link>
          <router-link to="/nft/123"><sl-tag class="mr-2" size="small">WIP-11#12</sl-tag> </router-link>
        </p>
        <!-- <p>NFT持有价值/数量变化表</p> -->
        <div class="chart p">
          <sl-icon name="graph-up"></sl-icon>
          图表还在路上
        </div>
      </div>
      <h3>提及我的</h3>
      <p class="gray">即将开放</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showMsg() {
      this.$root.$emit('show-modal', {
        label: '消息',
        text: 'showMsg'
      })
    },
    goBack() {
      window.history.back()
    }
  }
}
</script>

<style lang="scss">
.user-info {
  background: #f8f8f8;
  border-radius: var(--sl-border-radius-medium);
  padding: var(--sl-spacing-medium);
}
</style>
