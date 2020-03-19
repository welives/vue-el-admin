<template>
  <div class="bg-white px-3 mt-2" style="margin: 0 -20px 40px;">
    <button-search>
      <template #left>
        <el-button type="primary" size="mini" @click="showDialog(false)"
          >添加会员等级</el-button
        >
      </template>
      <template #right>
        <div>
          <small class="mr-2">选择升级标准</small>
          <el-radio-group v-model="type" size="mini">
            <el-radio-button :label="0">累计消费</el-radio-button>
            <el-radio-button :label="1">累计次数</el-radio-button>
          </el-radio-group>
        </div>
      </template>
    </button-search>
    <!-- 表格数据 -->
    <el-table :data="tableData" border class="mt-2">
      <el-table-column prop="id" label="ID" width="60" align="center">
      </el-table-column>
      <el-table-column prop="name" label="会员等级" align="center">
      </el-table-column>
      <el-table-column #default="scope" label="升级条件" align="center">
        {{ type === 0 ? '累计消费' : '累计次数' }}:
        {{ type === 0 ? scope.row.consume : scope.row.times }}
      </el-table-column>
      <el-table-column prop="discount" label="折扣率(%)" align="center">
      </el-table-column>
      <el-table-column #default="scope" label="状态" align="center">
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
          <el-button slot="reference" type="danger" size="mini" plain v-auth
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
    <!-- 添加用户对话框 -->
    <level-dialog ref="levelDialog"></level-dialog>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import levelDialog from '@/components/user/level/level-dialog'
export default {
  name: 'UserLevel',
  components: {
    buttonSearch,
    levelDialog,
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '普通会员',
          consume: 100,
          times: 10,
          discount: 10,
          order: 0,
          status: true,
        },
      ],
      currentPage: 1,
      type: 0,
    }
  },
  methods: {
    showDialog(data) {
      this.$refs.levelDialog.showDialog(data)
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
