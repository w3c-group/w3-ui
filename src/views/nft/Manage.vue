<template>
  <div class="container">
    <div class="main-card">
      <h3>
        <span> 我的NFT <span class="gray">3</span> </span>
        <small>
          <router-link to="/nft">
            <sl-icon class="back-icon" name="arrow-90deg-left"></sl-icon>
            NFT列表</router-link
          >
        </small>
      </h3>
      <div class="intro">
        <span class="mr-2"> 查看全部 </span>
        <span class="mr-2">
          <a>查看隐藏</a>
        </span>
        <span class="mr-2">
          <a>只看NFT0</a>
        </span>
      </div>
      <div>
        <div class="nft-card" v-for="i in 3" :key="i">
          <b
            ><sl-tag size="small" class="mr-2">WIP-11#{{ i - 1 }}</sl-tag> 称号: 圆桌大佬
          </b>
          <p>
            已转手0次，助力创造者获得0WGT的支持
            <router-link to="/nft/12">详情</router-link>
          </p>
          <p>提案：标题标题标题</p>
          <p>广告：内容，没有就不显示</p>

          <div>
            到期时间20-11-02 <a href="">续期</a>
            <a class="ml-2" @click.stop="generateLink">生成转让链接</a>
          </div>

          <div class="single">
            <span class="gray"> 当前价格500WGT </span>

            <router-link to="/proposal/12">
              <sl-button> 前往提案 </sl-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    generateLink() {
      this.$root.$emit('show-modal', {
        label: '生成转让链接',
        text: '鼓励的是一对一私聊建立联系，另外就是，口令是可以自己定义或随机的'
      })
    }
  }
}
</script>

<style>
</style>
