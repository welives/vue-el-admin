<template>
  <div class="bg-white px-3 mt-2" style="margin: 0 -20px 40px;">
    <button-search :showSearch="false">
      <template #left>
        <el-button
          type="primary"
          class="mr-2"
          size="mini"
          @click="showDialog(false)"
          >添加规格</el-button
        >
        <el-popconfirm title="是否删除选中的数据？" @onConfirm="deleteAll">
          <el-button slot="reference" type="danger" size="mini"
            >批量删除</el-button
          >
        </el-popconfirm>
      </template>
    </button-search>
    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      border
      class="mt-2"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="规格名称"
        width="350"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="value"
        label="规格值"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="order"
        label="排序"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        header-align="center"
      ></el-table-column>
      <el-table-column
        #default="scope"
        label="状态"
        header-align="center"
        width="80"
      >
        <div class="d-flex align-items-center justify-content-center">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div>
      </el-table-column>
      <el-table-column
        #default="scope"
        label="操作"
        header-align="center"
        width="150"
      >
        <div class="d-flex align-items-center justify-content-center">
          <el-button
            type="warning"
            size="mini"
            plain
            class="mr-2"
            @click="showDialog(scope)"
            >编辑</el-button
          >
          <el-popconfirm
            title="是否删除该条数据？"
            @onConfirm="deleteItem(scope.$index)"
          >
            <el-button slot="reference" type="danger" size="mini" plain
              >删除</el-button
            >
          </el-popconfirm>
        </div>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div style="height: 60px;"></div> -->
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
    <!-- 添加规格对话框 -->
    <spec-dialog ref="specDialog"></spec-dialog>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import specDialog from '@/components/shop/spec/spec-dialog'
export default {
  name: 'Spec',
  components: {
    buttonSearch,
    specDialog,
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '颜色1',
          value: '红色,绿色,蓝色',
          order: 100,
          status: true,
          type: 0,
        },
        {
          id: 2,
          name: '颜色2',
          value: '红色,绿色,蓝色',
          order: 100,
          status: true,
          type: 0,
        },
        {
          id: 3,
          name: '颜色3',
          value: '红色,绿色,蓝色',
          order: 100,
          status: true,
          type: 0,
        },
        {
          id: 4,
          name: '颜色4',
          value: '红色,绿色,蓝色',
          order: 100,
          status: true,
          type: 0,
        },
      ],
      currentPage: 1,
      multipleSelection: [],
    }
  },
  methods: {
    showDialog(data) {
      this.$refs.specDialog.showDialog(data)
    },
    deleteItem(index) {
      this.tableData.splice(index, 1)
    },
    deleteAll() {
      this.multipleSelection.forEach((data) => {
        const index = this.tableData.findIndex((v) => v.id === data.id)
        if (index !== -1) {
          this.tableData.splice(index, 1)
        }
      })
      this.multipleSelection = []
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
