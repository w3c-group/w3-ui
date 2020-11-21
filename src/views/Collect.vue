<template>
  <div>
    <div class="container">
      <div class="intro">
        <sl-icon name="cup-straw"></sl-icon>
        罗列不限于通过提案协作完成的Mixin生态应用
      </div>

      <div class="main">
        <a href="https://w3c.group/find" target="_blank" class="item-card">
          <h3>发现主题</h3>
          <div>浏览W3协作组上最新发布的主题</div>
        </a>

        <a href="https://w3c.group/surprise" target="_blank" class="item-card">
          <h3>最新小组</h3>
          <!-- 推荐 -->
          <div>浏览最新创建的W3C小组</div>
        </a>

        <a href="https://w3c.group/user/group" target="_blank" class="item-card">
          <h3>小组管理</h3>
          <div>管理作为组长或管理员的小组</div>
        </a>

        <a href="https://w3c.group/wgt" target="_blank" class="item-card">
          <h3>WGT浏览器</h3>
          <div>WGT的流动情况公示</div>
        </a>

        <div class="item-card">
          <h3>W3节点</h3>
          <div>基于MTG，为基于WGT的应用提供可信支持</div>
        </div>

        <a href="https://swap.xin/all" target="_blank" class="item-card">
          <h3>Mixin名片</h3>
          <div>作为Mixin外用户的落地页，并引导下载</div>
        </a>

        <a href="https://swap.xin/jjp" target="_blank" class="item-card">
          <h3>降价拍</h3>
          <div>万物皆可拍卖</div>
        </a>
      </div>

      <div class="list-bottom">
        没找到想要的应用？赶紧去<router-link class="text-bold" to="/proposal">提案</router-link
        >找找！官方APP上线后体验更佳
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  flex-flow: row wrap;
  justify-content: space-between;
}
.intro {
  margin-top: 1.5rem;
}
.item-card {
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem 2rem;
  div {
    color: var(--sl-color-gray-40);
  }

  flex: 0 0 33%;
  @media (max-width: 760px) {
    flex: 0 0 49%;
  }
  @media (max-width: 420px) {
    flex: 0 0 100%;
  }
}
</style>
