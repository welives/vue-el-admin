<template>
  <div class="bg-white px-3" style="margin: 0 -20px 40px;">
    <el-tabs v-model="tabIndex">
      <el-tab-pane
        v-for="(tab, index) in tabBars"
        :key="index"
        :label="tab.name"
      >
        <component :is="tab.component"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import common from '@/common/mixins/common.js'
import all from '@/components/order/all'
import nopay from '@/components/order/nopay'
import noship from '@/components/order/noship'
import shiped from '@/components/order/shiped'
import received from '@/components/order/received'
import finish from '@/components/order/finish'
import closed from '@/components/order/closed'
import refunding from '@/components/order/refunding'
export default {
  name: 'orderList',
  components: {
    all,
    nopay,
    noship,
    shiped,
    received,
    finish,
    closed,
    refunding,
  },
  mixins: [common],
  data() {
    return {
      tabBars: [
        { name: '全部', key: 'all', component: all },
        { name: '待付款', key: 'nopay', component: nopay },
        { name: '待发货', key: 'noship', component: noship },
        { name: '已发货', key: 'shiped', component: shiped },
        { name: '已收货', key: 'received', component: received },
        { name: '已完成', key: 'finish', component: finish },
        { name: '已关闭', key: 'closed', component: closed },
        { name: '退款中', key: 'refunding', component: refunding },
      ],
    }
  },
  created() {
    this.__initTabBar()
  },
  methods: {},
}
</script>

<style scoped></style>
