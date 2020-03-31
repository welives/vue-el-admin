<template>
  <div>
    <button-search :showSearch="false">
      <template #left>
        <el-button type="primary" size="mini" @click="showDialog(false)"
          >添加角色</el-button
        >
      </template>
    </button-search>
    <!-- 表格数据 -->
    <el-table :data="getCurPageData" border class="mt-2">
      <el-table-column prop="name" label="角色名称" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" align="center">
      </el-table-column>
      <el-table-column #default="scope" label="是否启用" align="center">
        <el-switch
          v-model="scope.row.status"
          active-color="#13ce66"
          @change="statusChange('role/UPDATE_status', scope)"
        ></el-switch>
      </el-table-column>
      <el-table-column #default="scope" label="操作" align="center">
        <!-- <el-button type="primary" size="mini" plain>配置权限</el-button> -->
        <el-button
          type="warning"
          size="mini"
          plain
          class="mr-2"
          @click="showDialog(scope)"
          >修改</el-button
        >
        <el-popconfirm
          title="是否删除该条数据？"
          @onConfirm="deleteItem('role/DELETE_single', scope)"
        >
          <el-button slot="reference" type="danger" size="mini" plain
            >删除</el-button
          >
        </el-popconfirm>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="height: 60px;"></div>
    <el-footer
      class="border-top d-flex align-items-center px-0 position-fixed bg-white fixed-bottom"
      style="left: 200px;"
    >
      <div class="text-center flex-fill">
        <el-pagination
          :current-page="page.current"
          :page-sizes="page.sizes"
          :page-size="page.size"
          :total="page.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="pageSizeChange"
          @current-change="curPageChange"
        ></el-pagination>
      </div>
    </el-footer>
    <role-dialog ref="roleDialog"></role-dialog>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import roleDialog from '@/components/setting/manager/role-dialog'
import common from '@/common/mixins/common'
import { mapState } from 'vuex'
export default {
  name: 'RoleList',
  inject: ['$layout'],
  components: {
    buttonSearch,
    roleDialog,
  },
  mixins: [common],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      dataList: (state) => state.role.roleList,
    }),
  },
  created() {
    this.__init()
  },
  methods: {
    __init() {
      this.$layout.showLoading()
      this.$store.dispatch('role/getRoleList').then((res) => {
        this.page.total = res.length
      })
      this.$layout.hideLoading()
    },
    showDialog(data) {
      this.$refs.roleDialog.showDialog(data)
    },
  },
}
</script>

<style scoped></style>
