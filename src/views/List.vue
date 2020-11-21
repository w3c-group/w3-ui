<template>
  <div class="container">
    <h3 class="title">
      <span v-if="!postTodo">发布动态 <a class="text-bold" @click.stop="postTodo = true"> 待办 </a> </span>
      <span v-else>发布待办 <a class="text-bold" @click.stop="postTodo = false"> 动态 </a> </span>

      <sl-button-group>
        <sl-select placeholder="选择小组">
          <!-- （请先加入小组） -->
          <sl-menu-item>选择小组</sl-menu-item>
        </sl-select>
      </sl-button-group>
    </h3>
    <div class="intro">仅NFT持有者有权发布，其他小组成员可围观</div>

    <div class="main-card">
      <a class="">选择提案</a>

      <div class="mt-1">
        <Post />
      </div>
    </div>

    <div>
      <h3 class="title mb-2">
        <span> 执行 <span class="gray">12</span> <router-link to="/proposal/123">WIP-12 </router-link> </span>
        <span>
          <!-- TODO -->
          <!-- <a class="ml-2">只看动态/待办</a>
          <a class="ml-2">只看我发布</a>
          <a class="ml-2">只看提及我</a> -->
          <a class="ml-2" @click.stop="showDrawer('list-search')">搜索</a>
          <a class="ml-2" @click.stop="showDrawer('list-filter')">筛选</a>
        </span>
      </h3>
      <!-- 对应别的icon -->
      <div class="item-card" v-for="i in 12" :key="i">
        <div class="single">
          <UserInfo />
          <a @click.stop="showOption">
            <sl-icon name="three-dots"></sl-icon>
          </a>
        </div>
        <div class="quote" v-if="i % 3 === 0">引用了 <a>#12123</a> xxxx</div>
        <p>
          <b> #12123 </b>
          <sl-tag size="small" type="info" class="ml-1" v-if="i % 2 === 0">待办</sl-tag>
          <sl-tag size="small" class="ml-1" v-else>动态</sl-tag>
          <br />
          记录上链、使用多签保证上链过程的公正性
        </p>
        <p class="user-list">已分配给：<span class="avatar small"></span></p>

        <div class="text-center">
          <sl-button size="small" class="mr-1" v-if="i % 2 === 0">
            <sl-icon class="icon" name="emoji-smile"></sl-icon> <span class="gray">0</span></sl-button
          >
          <sl-button size="small" class="mr-1" v-if="i % 2 === 0">
            <sl-icon class="icon" name="emoji-frown"></sl-icon> <span class="gray">0</span></sl-button
          >
          <sl-button size="small" v-if="true">赞赏</sl-button>
          <span v-else>
            <sl-button v-if="true">关注 0</sl-button>
            <sl-button v-else @click.stop="take">标记完成</sl-button>
          </span>
        </div>
      </div>
    </div>

    <div class="list-bottom">已经到底了</div>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'

import Post from '@/components/Post.vue'

export default {
  data() {
    return {
      postTodo: false
    }
  },
  components: {
    UserInfo,
    Post
  },
  methods: {
    // postTodo() {
    //   this.
    // },
    showDrawer(type) {
      this.$root.$emit('drawer-show', type)
    },
    showOption() {
      this.$root.$emit('show-modal', {
        label: '操作',
        text: '<a>引用</a><div><a>复制链接</a></div>'
      })
    },
    take() {
      // 加入的小组才能看见
    },
    create() {
      this.$root.$emit('show-modal', {
        text: 'create'
      })
    },
    groupList() {
      // 获得
    }
  },
  mounted() {
    // this.groupList().then(res => {})
  }
}
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: top;
  margin-top: 0.45rem;
}
</style>
