<template>
  <div class="container">
    <div class="main-card">
      <h3>
        <span v-if="editing">编辑NFT<sl-tag size="small" class="ml-2">WIP-11#1</sl-tag></span>
        <span v-else>NFT详情</span>
        <small>
          <router-link to="/nft">
            <sl-icon class="back-icon" name="arrow-90deg-left"></sl-icon>
            NFT列表</router-link
          >
          <router-link class="ml-2" to="/nft/manage">
            <sl-icon class="normal-icon" name="collection"></sl-icon>
            我的</router-link
          >
        </small>
      </h3>

      <div class="mt-2" v-if="editing">
        <sl-input type="text" label="广告" placeholder="广告内容（可选）"></sl-input>
        <sl-input type="number" label="NFT单价" min="500" max="50000" placeholder="填入WGT数额，至少为500"></sl-input>
        <!-- 至少要加价超过25%，才能保本，建议加价50%，需要是100WGT的倍数 -->
        <div><sl-checkbox name="agree" checked> 挂单状态，可被购买</sl-checkbox></div>
        <div><sl-checkbox name="agree"> 隐藏，其他人不可见</sl-checkbox></div>
        <h4>NFT0设置</h4>
        <sl-input type="text" label="称号" placeholder="比如“圆桌大佬”"></sl-input>
        <!-- <sl-input type="text" label="广告" placeholder="广告内容（可选）"></sl-input> -->
        <div class="text-center mt-2">
          <sl-button @click.stop="editing = false"> 取消 </sl-button>
          <sl-button class="ml-1" type="primary"> 保存 </sl-button>
        </div>
      </div>
      <div v-else>
        <div class="nft-card">
          <b><sl-tag size="small" class="mr-2">WIP-11#1</sl-tag> 称号: 圆桌大佬 </b>
          <p>已转手0次，助力创造者获得0WGT的支持</p>
          <p>提案：标题标题标题</p>
          <p>广告：内容，没有就不显示</p>

          <div class="single">
            <div class="single gray">
              <div class="avatar small mr-1"></div>
              jim
            </div>

            <router-link to="/proposal/12">
              <sl-button> 前往提案 </sl-button>
            </router-link>
          </div>
        </div>

        <div class="gray mb-2">将于123天后到期</div>

        <div class="text-center mb-2">
          <!-- 未挂单不能买 -->
          <sl-button @click.stop="buy" disabled="false" type="primary"> <sl-icon name="bag"></sl-icon> 购买</sl-button>
          <sl-button @click.stop="share" class="ml-1"> <sl-icon name="share"></sl-icon> 分享</sl-button>

          <div class="mt-2 gray">
            当前价格500WGT
            <a @click.stop="history"><sl-icon name="clock-history" class="history-icon"></sl-icon></a>
          </div>
        </div>
      </div>

      <div class="single">
        <span>
          <span v-if="!editing">
            <a @click.stop="report">举报</a>/
            <a @click.stop="editing = true">编辑</a>
            <a class="ml-2" v-if="true" @click.stop="shareEarn">0号NFT管理</a>
          </span>
        </span>

        <div class="gray">
          <a>关注</a> 1
          <!-- 带价格 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editing: false
    }
  },
  methods: {
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
    shareEarn() {
      this.$root.$emit('show-modal', {
        label: '0号NFT管理',
        text: '空投分红给其他NFT持有者：输入WGT数额'
      })
    },
    history() {
      this.$root.$emit('show-modal', {
        label: '历史追溯',
        text: '创建或转手都会显示价格和时间'
      })
    },
    report() {
      this.$root.$emit('show-modal', {
        text: '举报 input'
      })
    },
    buy() {
      this.$root.$emit('show-modal', {
        text: '购买/续期（年） 每张NFT每年需要10%的续期，，，和初始一样95%给0号NFT持有者'
      })
    }
  }
}
</script>

<style>
</style>
