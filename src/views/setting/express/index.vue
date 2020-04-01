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
import freight from '@/components/setting/express/freight-tmp'
import expressTrack from '@/components/setting/express/express-track'
export default {
  name: 'ExpressSetting',
  components: {
    freight,
    expressTrack,
  },
  mixins: [common],
  data() {
    return {
      tabBars: [
        { name: '运费模板', component: freight },
        { name: '物流跟踪', component: expressTrack },
      ],
    }
  },
  created() {
    this.__initTabBar()
  },
}
</script>

<style scoped></style>
