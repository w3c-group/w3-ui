<template>
  <div class="container">
    <div class="main-card">
      <h3>
        <span> 创建提案 </span>
        <small>
          <router-link to="/proposal">
            <sl-icon class="back-icon" name="arrow-90deg-left"></sl-icon>
            提案列表
          </router-link>
        </small>
      </h3>

      <div class="mb-2 gray">发布想要做的事，获得WGT支持，协作推进提案执行</div>
      <!-- <router-link class="mr-2" to="/proposal/wip-12">W3协作组</router-link>
      <router-link class="mr-2" to="/proposal/mip-12">Mixin生态</router-link>
      <router-link to="/proposal/sip-12">非限定</router-link> -->

      <!-- <div>提案ID 10 #MIP-10</div> -->

      <sl-form class="form-overview">
        <sl-select ref="pType" label="所在小组" placeholder="提案必须基于小组且无法解绑">
          <sl-menu-item value="w3">反馈讨论组</sl-menu-item>
        </sl-select>
        <sl-select ref="pType" label="提案类别" placeholder="WIP/MIP/NIP">
          <sl-menu-item value="w3">W3协作组 (WIP)</sl-menu-item>
          <sl-menu-item value="mixin">Mixin生态 (MIP)</sl-menu-item>
          <sl-menu-item value="normal">常规提案 (NIP)</sl-menu-item>
        </sl-select>

        <sl-input label="提案标题" placeholder="70字内"></sl-input>
        <sl-textarea label="内容描述" placeholder="..."></sl-textarea>
        <sl-textarea label="协作描述" placeholder="..."></sl-textarea>

        <sl-checkbox name="agree" checked> 投票 (小组成员实名平权投票)</sl-checkbox>
      </sl-form>

      <div class="mt-2 mb-2">
        <div>说明：创建成功后，您将获得当前提案唯一且限量的30张NFT <a @click.stop="nftDesc">介绍</a></div>
      </div>

      <div>
        <div class="text-center mt-2 mb-2">
          <sl-button type="primary">支付300WGT创建提案</sl-button>
        </div>

        <div class="gray">
          <div>
            * 创建提案需支付WGT(好提案可联系 Mixin ID:
            <a href="mixin://users/1b99263c-5223-42d3-82bc-637e68afc66a" target="_blank" rel="noopener noreferrer"
              >916716</a
            >
            获得超出创建所需WGT奖励)。
          </div>
          <div>* 提案上链需慎重，内容如果被举报且通过，则将被限制并且一直隐藏到整改完成。</div>
          <div>* 为避免和已有提案的努力方向重合，强烈建议先进行搜索，并参与到已有提案的协作中共同推进提案。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    nftDesc() {
      this.$root.$emit('show-modal', {
        label: 'NFT介绍',
        text:
          '30张NFT中仅有0号NFT拥有管理权限，可用于发放收益给其余29张NFT持有者，回收未续期NFT等。<b>所有NFT都支持定价转让</b>，转让成交价的80%给卖出方，15%给0号NFT持有者，5%给W3协作组，转让过程不仅赚取了溢价同时帮助了提案推进。此外，<b>持有NFT享有治理权、广告权、收益权</b>。'
      })
    }
  }
}
</script>

<style>
</style>
