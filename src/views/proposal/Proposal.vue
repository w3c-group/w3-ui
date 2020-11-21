<template>
  <div class="container">
    <div class="main">
      <div class="left">
        <h3 class="title">
          <span>提案 <span class="gray">10</span></span>
          <span>
            <a class="mr-2" @click.stop="showDrawer('p-search')">搜索</a>
            <a class="mr-2" @click.stop="showDrawer('p-filter')">筛选</a>
            <router-link to="/proposal/create">创建</router-link>
            <!-- <sl-input placeholder="搜索提案或小组"> </sl-input> -->
          </span>
        </h3>

        <div class="intro"><span class="sm-hide">创造力决定上限，</span>欢迎在属于创造者的海洋释放灵感、获得启发</div>
        <div class="item-card" v-for="i in 10" :key="i">
          <div class="gray">创建于 {{ new Date().toLocaleString() }}</div>
          <router-link to="/proposal/12" class="text-bold"><sl-tag size="small" class="mr-2">WIP-{{i}}</sl-tag>提案标题</router-link>
          <p>
            这里是提案正文，接下来会尽快让大佬们能够参与，样式和细节也会调整
            <router-link to="/proposal/12">详情</router-link>
          </p>
          <div class="gray single">
            讨论0 阅读123
            <span><a href="">已关注</a>0</span>
          </div>
        </div>
        <div class="list-bottom">已经到底了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
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
