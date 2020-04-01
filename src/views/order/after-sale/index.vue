<template>
  <div class="bg-white px-3 mt-2" style="margin: 0 -20px 40px;">
    <button-search ref="buttonSearch">
      <template #right>
        <el-input
          v-model="search.keyword"
          placeholder="请输入订单号"
          size="mini"
          class="mr-2 w-50"
        ></el-input>
        <el-date-picker
          v-model="search.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </template>
    </button-search>
    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      border
      class="mt-2"
      @selection-change="chooseData"
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
      <el-table-column #default="scope" label="操作" align="center" width="150">
        <el-button type="warning" size="mini" plain class="mr-2"
          >编辑</el-button
        >
        <el-popconfirm title="是否删除该条数据？" @onConfirm="">
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
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import common from '@/common/mixins/common.js'
export default {
  name: 'afterSale',
  components: {
    buttonSearch,
  },
  mixins: [common],
  data() {
    return {
      tableData: [],
      search: {
        time: '',
        keyword: '',
      },
    }
  },
  methods: {},
}
</script>

<style scoped></style>
