<template>
  <div class="px-3" style="margin: 0 -20px 40px;">
    <router-link
      :to="{ name: 'shop_goods' }"
      style="position: absolute;top: 11px;left: 170px;"
    >
      <el-button size="small">回到商品列表页</el-button>
    </router-link>
    <el-tabs v-model="tabIndex" @tab-click="tabClick">
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
import basicSetting from '@/components/goods/basic-setting'
import goodsSpec from '@/components/goods/goods-spec'
import goodsAttr from '@/components/goods/goods-attr'
import goodsDetail from '@/components/goods/goods-detail'
import mediaSetting from '@/components/goods/media-setting'
import discountSetting from '@/components/goods/discount-setting'
export default {
  name: 'AddGoods',
  components: {
    basicSetting,
    goodsSpec,
    goodsAttr,
    goodsDetail,
    mediaSetting,
    discountSetting
  },
  mixins: [common],
  data() {
    return {
      tabIndex: 0,
      tabBars: [
        { name: '基础设置', component: basicSetting },
        { name: '商品规格', component: goodsSpec },
        { name: '商品属性', component: goodsAttr },
        { name: '商品详情', component: goodsDetail },
        { name: '媒体设置', component: mediaSetting },
        { name: '折扣设置', component: discountSetting }
      ]
    }
  },
  created() {
    this.__initTabBar(this.$options.name)
  },
  methods: {
    tabClick() {}
  }
}
</script>

<style scoped></style>
