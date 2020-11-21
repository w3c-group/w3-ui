<template>
  <div class="container">
    <div class="main">
      <div class="left">
        <h3 class="title">
          <span> 非同质化通证 <span class="gray">24</span> </span>
          <span>
            <a class="mr-2" @click.stop="showDrawer('nft-search')">搜索</a>
            <a class="mr-2" @click.stop="showDrawer('nft-filter')">筛选</a>
            <router-link to="/nft/manage">我的</router-link>
            <!-- <sl-input placeholder="搜索提案或小组"> </sl-input> -->
          </span>
        </h3>
        <div class="intro">转手0次，助力创造者获得0WGT支持</div>

        <div class="mt-2 item-card" v-for="i in 24" :key="i">
          <div class="gray">创建于{{ new Date().toLocaleString() }}</div>

          <div class="text-bold">
            <sl-tag size="small" class="mr-2">WIP-3#{{i}}</sl-tag>
            <router-link class="" to="/nft/12">称号: 圆桌大佬</router-link>
          </div>
          <!-- 当前价：123WGT（$21313）  -->
          <!-- <sl-button> 关注 </sl-button> -->

          <p>已转手0次，助力创造者获得0WGT的支持 <router-link to="/nft/12">详情</router-link></p>

          <!-- 已挂单可直接购买 -->
          <!-- 默认就是上次购买价加价了50% -->

          <div class="single">
            <span class="gray single">
              <div class="avatar small mr-1"></div>
              jim
            </span>
            <a>关注</a>
          </div>
        </div>
        <div class="list-bottom">已经到底了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showDrawer(type) {
      this.$root.$emit('drawer-show', type)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
