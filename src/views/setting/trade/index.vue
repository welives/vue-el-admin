<template>
  <div class="px-3" style="margin: 0 -20px 40px;">
    <el-tabs v-model="tabIndex">
      <el-tab-pane
        v-for="(tab, index) in tabBars"
        :key="index"
        :label="tab.name"
      >
        <component :is="tab.component"></component
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import common from '@/common/mixins/common.js'
import payment from '@/components/setting/trade/payment'
import shopping from '@/components/setting/trade/shopping'
export default {
  name: 'TradeSetting',
  components: {
    payment,
    shopping
  },
  mixins: [common],
  data() {
    return {
      tabIndex: 0,
      tabBars: [
        { name: '支付设置', component: payment },
        { name: '购物设置', component: shopping }
      ]
    }
  },
  created() {
    this.__initTabBar(this.$options.name)
  }
}
</script>

<style scoped></style>
