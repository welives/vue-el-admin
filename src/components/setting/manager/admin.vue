<template>
  <div>
    <button-search>
      <template #left>
        <el-button type="primary" size="mini" @click="showDialog(false)"
          >添加管理员</el-button
        >
      </template>
      <template #right>
        <el-input
          v-model="keyword"
          placeholder="账号/手机号/邮箱"
          size="mini"
          class="mr-2"
          style="width: 200px;"
        ></el-input>
        <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
      </template>
    </button-search>
    <!-- 表格数据 -->
    <el-table :data="tableData" border class="mt-2">
      <el-table-column #default="scope" label="登录账号" align="center">
        <div class="media d-flex align-items-center justify-content-center">
          <img
            class="mr-2 rounded-circle"
            :src="scope.row.avatar"
            style="width: 32px;"
          />
          <div class="media-body flex-grow-0">
            <el-button type="text">{{ scope.row.username }}</el-button>
          </div>
        </div>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center">
      </el-table-column>
      <el-table-column prop="groupName" label="所属用户组" align="center">
      </el-table-column>
      <el-table-column #default="scope" label="创建/登录" align="center">
        <div>
          创建时间: <small>{{ scope.row.createTime }}</small>
        </div>
        <div>
          最后登录: <small>{{ scope.row.lastTime }}</small>
        </div>
      </el-table-column>
      <el-table-column #default="scope" label="状态" align="center" width="100">
        <el-switch
          v-model="scope.row.status"
          active-color="#13ce66"
        ></el-switch>
      </el-table-column>
      <el-table-column #default="scope" label="操作" align="center" width="180">
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
    <admin-dialog ref="adminDialog"></admin-dialog>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import adminDialog from '@/components/setting/manager/admin-dialog'
export default {
  name: 'AdminList',
  components: {
    buttonSearch,
    adminDialog,
  },
  data() {
    return {
      keyword: '',
      tableData: [
        {
          id: 1,
          username: 'admin',
          avatar: 'http://imgs.aixifan.com/cms/2017-12-05/1512447096114.jpg',
          phone: '13912345678',
          email: '10000@qq.com',
          groupId: 0,
          groupName: '管理员',
          createTime: '2020-03-07 03:08:31',
          lastTime: '2020-03-07 03:08:31',
          status: true,
        },
      ],
      currentPage: 1,
    }
  },
  methods: {
    searchEvent(e) {
      console.log(e)
    },
    showDialog(data) {
      this.$refs.adminDialog.showDialog(data)
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
