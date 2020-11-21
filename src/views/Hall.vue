<template>
  <div class="container">
    <h3 class="title">
      <span>
        上链存证公示 <span class="gray">12</span>
        <!-- 提示 -->
      </span>

      <div>
        <a @click.stop="showDrawer('hall-search')">搜索</a>
        <a class="ml-2" @click.stop="showDrawer('hall-filter')">筛选</a>
      </div>
    </h3>
    <div class="intro">包括所有提案、执行、NFT流通</div>

    <div class="item-card" v-for="i in 12" :key="i">
      <div>
        <!-- <Skeleton /> -->
      </div>
      <div class="single">
        <UserInfo />
        <div>
          <!-- TODO -->
          <router-link to="/proposal/12">前往提案</router-link>
          <!-- /
            <router-link to="/proposal/12">查看讨论</router-link>/
          <router-link to="/proposal/12">查看待办</router-link> -->
        </div>
      </div>
      <div class="mt-2">
        <router-link to="/proposal/123"><sl-tag class="mr-2" size="small">WIP-11</sl-tag> </router-link>
        提案标题xxxxxxxxxxxxxxxxx：NFT <router-link to="/nft/123">WIP-11#0</router-link> 持有者
        <router-link to="/user/jim">jim</router-link> 发布了动态 <router-link to="/list">#123123</router-link>
      </div>
    </div>

    <div class="list-bottom">已经到底了</div>
  </div>
</template>

<script>
// import Skeleton from '@/components/Skeleton.vue'
import UserInfo from '@/components/UserInfo.vue'

export default {
  components: {
    // Skeleton,
    UserInfo
  },
  methods: {
    showDrawer(type) {
      this.$root.$emit('drawer-show', type)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
