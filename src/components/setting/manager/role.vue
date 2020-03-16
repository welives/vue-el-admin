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
    <el-table :data="tableData" border class="mt-2">
      <el-table-column prop="name" label="角色名称" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" align="center">
      </el-table-column>
      <el-table-column #default="scope" label="是否启用" align="center">
        <el-switch
          v-model="scope.row.status"
          active-color="#13ce66"
        ></el-switch>
      </el-table-column>
      <el-table-column #default="scope" label="操作" align="center">
        <el-button type="primary" size="mini" plain>配置权限</el-button>
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
          @onConfirm="deleteItem(scope.$index)"
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
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-footer>
    <role-dialog ref="roleDialog"></role-dialog>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import roleDialog from '@/components/setting/manager/role-dialog'
export default {
  name: 'RoleList',
  components: {
    buttonSearch,
    roleDialog,
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '超级管理员',
          createTime: '2020-03-07 03:08:31',
          status: true,
        },
      ],
      currentPage: 1,
    }
  },
  methods: {
    showDialog(data) {
      this.$refs.roleDialog.showDialog(data)
    },
    deleteItem(index) {
      this.tableData.splice(index, 1)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
  },
}
</script>

<style scoped></style>
