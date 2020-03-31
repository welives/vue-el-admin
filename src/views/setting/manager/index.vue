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
import adminList from '@/components/setting/manager/admin'
import roleList from '@/components/setting/manager/role'
import permissionList from '@/components/setting/manager/permission'
export default {
  name: 'ManagerSetting',
  components: {
    adminList,
    roleList,
    permissionList,
  },
  mixins: [common],
  data() {
    return {
      tabIndex: 0,
      tabBars: [
        { name: '管理员列表', component: adminList, key: 'admin' },
        { name: '角色列表', component: roleList, key: 'role' },
        { name: '权限列表', component: permissionList, key: 'permission' },
      ],
    }
  },
  created() {
    this.__initTabBar()
  },
}
</script>

<style scoped></style>
