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
import all from '@/components/shop/goods/all'
import checking from '@/components/shop/goods/checking'
import saling from '@/components/shop/goods/saling'
export default {
  name: 'goodsList',
  components: {
    all,
    checking,
    saling,
  },
  mixins: [common],
  data() {
    return {
      tabBars: [
        { name: '全部', key: 'all', component: all },
        { name: '审核中', key: 'checking', component: checking },
        { name: '出售中', key: 'saling', component: saling },
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
