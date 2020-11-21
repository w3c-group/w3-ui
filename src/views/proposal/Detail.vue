<template>
  <div class="container">
    <div class="main-card">
      <div class="single">
        <div class="gray">
          创建于{{ new Date().toLocaleString() }}
          <!-- /更新于123 -->
        </div>
        <router-link to="/proposal">
          <sl-icon class="back-icon" name="arrow-90deg-left"></sl-icon>
          提案列表
        </router-link>
      </div>
      <h3>
        <span> <sl-tag class="mr-2">WIP-11</sl-tag>提案标题 </span>
      </h3>

      <p>
        <span>这里是提案正文xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span><br />
        <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
      </p>
      <h4>协作描述</h4>
      <div>需要1. 2.</div>

      <div class="text-center mt-2">
        <div class="gray">
          以上内容已上链存证
          <a @click.stop="history"><sl-icon name="clock-history" class="history-icon"></sl-icon></a>
        </div>
      </div>

      <div class="group-info mt-2">
        来自<a class="text-bold" href="https://w3c.group/g/1123124" target="_blank">反馈讨论组</a> 组长<router-link
          class="text-bold"
          to="/user/jim"
          >瓦工</router-link
        >
        成员<span class="gray">823</span>
      </div>

      <div class="text-center mt-2">
        <div class="grant">
          <div class="mb-2">
            <b> 共0人赞赏 累计0WGT </b>
          </div>
          <sl-button @click.stop="grant" type="primary"> <sl-icon name="gift"></sl-icon> 赞赏</sl-button>
          <sl-button @click.stop="share" class="ml-1"> <sl-icon name="share"></sl-icon> 分享</sl-button>
        </div>
      </div>

      <h3>
        <span>NFT持有者 <span class="gray">1</span></span>
      </h3>
      <!-- 页内滚动 -->
      <AvatarList :list="[1]" />

      <h3>组员投票</h3>
      <div v-if="true">
        <div class="vote-list">
          <div v-if="false" class="avatar-box">
            11人支持：
            <AvatarList :list="30" />
            8人反对：
            <AvatarList :list="[1, 3, 4]" />
          </div>
          <div v-else class="avatar-box mb-2">参与投票后可以看到投票结果</div>
          <div v-if="true" class="text-center mb-2">
            <sl-button @click.stop="vote('up')"><sl-icon name="emoji-smile"></sl-icon> 支持</sl-button>
            <sl-button class="ml-1" @click.stop="vote('down')"><sl-icon name="emoji-frown"></sl-icon> 反对 </sl-button>
          </div>
          <div v-else>
            <sl-button v-if="true" @click.stop="vote">修改为反对/支持</sl-button>
            <div class="gray" v-else>支付10WGT可修改投票结果</div>
          </div>
        </div>
      </div>
      <div class="gray" v-else>当前提案无投票</div>

      <h3>已采纳的讨论</h3>

      <div class="mb-2">
        <div class="gray">暂无</div>
      </div>

      <div class="single gray">
        <span class="gray">阅读 123</span>
        <!-- 修改时可以： 支持主动设置隐藏/显示 -->
        <!-- TODO -->
        <!-- 修改 / -->
        <span><a>关注 </a>1</span>
      </div>
    </div>

    <h3 class="title">
      <span>
        讨论 <span class="gray">0</span>
        <small class="gray ml-2">小组成员可参与</small>
      </span>
      <router-link to="/list">前往执行</router-link>
    </h3>

    <div class="main-card last">
      <Post />
      <div class="text-center mt-2 gray">暂无讨论</div>
      <!-- 讨论可被赞赏 -->
      <!-- <div>#1 xxxx <a> 赞 （1、11WGT）</a> 赞越多越多人能看到，赞的同时可以赞赏WGT</div>
      <div>#2 ssss<a> 赞 </a></div>
      （可以设置后期的发展和讨论，仅NFT持有可参与，也可以付费围观。因为内容存证是hash上链的，所以是可以做到内部保密的）
      讨论如果高票会前置，，，最后由提案发起人选择是否接受，，，

      <div>然后最后关闭评论的投票后，，，才进行正式的投票，，，通过才会</div> -->
    </div>
  </div>
</template>

<script>
import AvatarList from '@/components/AvatarList.vue'
import Post from '@/components/Post.vue'

export default {
  components: {
    AvatarList,
    Post
  },
  methods: {
    history() {
      this.$root.$emit('show-modal', {
        label: '历史追溯',
        text: '<div>时间、内容 <a>在新页面中打开</a></div>'
      })
    },
    grant() {
      this.$root.$emit('show-modal', {
        label: '赞赏',
        text: '<div>输入金额<sl-input /></div><div>赞赏人列表，数额，头像</div>'
      })
    },
    share() {
      const content = window.location.href
      this.$copyText(content).then(
        () => {
          this.$root.$emit('show-toast', {
            text: '链接复制成功！',
            sec: 1500
          })
        },
        () => {
          this.$root.$emit('show-toast', {
            text: `<div class="text-center">请手动复制口令：<b class="">${content}<b></div>`
          })
        }
      )
    },
    vote() {
      this.$root.$emit('show-toast', {
        text: '提交成功'
      })
    }
  }
}
</script>

<style lang="scss">
.vote-list {
  padding: var(--sl-spacing-medium);
  margin: var(--sl-spacing-small) 0;
  border: 0.05rem solid #eee;
  border-radius: var(--sl-border-radius-medium);
  .avatar-box {
    text-align: left;
  }
}
.history-icon {
  vertical-align: top;
  margin-top: 0.35rem;
}
.grant {
  padding: var(--sl-spacing-medium);
}
.group-info {
  background: var(--sl-color-gray-95);
  padding: var(--sl-spacing-medium);
  border-radius: var(--sl-border-radius-medium);
}
.main-card.last {
  margin-top: 0.4rem;
  margin-bottom: 4rem;
}
</style>
