<template>
  <div class="bg-white px-3 mt-2" style="margin: 0 -20px 40px;">
    <button-search :showSearch="true">
      <template #right>
        <el-date-picker
          v-model="search.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        >
        </el-date-picker>
        <el-input
          v-model="search.keyword"
          placeholder="请输入订单号"
          size="mini"
          style="width: 200px;"
          class="mx-2"
        ></el-input>
        <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
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
      <el-table-column prop="serial" label="商品信息" header-align="center">
      </el-table-column>
      <el-table-column prop="username" label="商品清单" header-align="center">
      </el-table-column>
      <el-table-column
        prop="price"
        label="订单金额"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="收货信息"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="content"
        label="买家"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="交易状态"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="创建时间"
        header-align="center"
      ></el-table-column>
      <el-table-column
        #default="scope"
        label="操作"
        header-align="center"
        width="150"
      >
        <div class="d-flex align-items-center justify-content-center">
          <el-button type="warning" size="mini" plain class="mr-2"
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
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
export default {
  name: 'AfterSale',
  components: {
    buttonSearch,
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      multipleSelection: [],
      search: {
        time: '',
        keyword: '',
      },
    }
  },
  methods: {
    searchEvent(e) {
      console.log(e)
    },
    deleteItem(index) {
      this.tableData.splice(index, 1)
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
