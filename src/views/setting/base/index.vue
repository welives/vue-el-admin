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
import access from '@/components/setting/base/access'
import upload from '@/components/setting/base/upload'
import security from '@/components/setting/base/security'
export default {
  name: 'BaseSetting',
  components: {
    access,
    upload,
    security
  },
  mixins: [common],
  data() {
    return {
      tabIndex: 0,
      tabBars: [
        { name: '注册与访问', component: access },
        { name: '上传设置', component: upload },
        { name: 'API安全', component: security }
      ]
    }
  },
  created() {
    this.__initTabBar(this.$options.name)
  }
}
</script>

<style scoped></style>
