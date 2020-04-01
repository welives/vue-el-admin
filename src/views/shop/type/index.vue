<template>
  <div class="bg-white px-3 mt-2" style="margin: 0 -20px 40px;">
    <button-search :showSearch="false">
      <template #left>
        <el-button
          type="primary"
          class="mr-2"
          size="mini"
          @click="showDialog(false)"
          >添加类型</el-button
        >
        <el-popconfirm
          title="是否删除选中的数据？"
          @onConfirm="deleteAll('type/DELETE_batch')"
        >
          <el-button slot="reference" type="danger" size="mini" v-auth
            >批量删除</el-button
          >
        </el-popconfirm>
      </template>
    </button-search>
    <!-- 表格数据 -->
    <el-table
      :data="getCurPageData"
      border
      class="mt-2"
      @selection-change="chooseData"
    >
      <el-table-column type="selection" width="40" align="center">
      </el-table-column>
      <el-table-column prop="name" label="类型名称" width="200" align="center">
      </el-table-column>
      <el-table-column #default="scope" label="属性标签" align="center">
        {{ scope.row.valueList | formatSpecValue }}</el-table-column
      >
      <el-table-column
        prop="order"
        label="排序"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column #default="scope" label="状态" align="center" width="150">
        <el-switch
          v-model="scope.row.status"
          active-color="#13ce66"
          @change="statusChange('type/UPDATE_status', scope)"
        ></el-switch>
      </el-table-column>
      <el-table-column #default="scope" label="操作" align="center" width="150">
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
          @onConfirm="deleteItem('type/DELETE_single', scope)"
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
          :current-page="page.current"
          :page-sizes="page.sizes"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="pageSizeChange"
          @current-change="curPageChange"
        ></el-pagination>
      </div>
    </el-footer>
    <!-- 添加类型对话框 -->
    <type-dialog ref="typeDialog"></type-dialog>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import typeDialog from '@/components/shop/type/type-dialog'
import common from '@/common/mixins/common.js'
import { mapState } from 'vuex'
export default {
  name: 'typeList',
  inject: ['$layout'],
  components: {
    buttonSearch,
    typeDialog,
  },
  mixins: [common],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      dataList: (state) => state.type.typeList,
    }),
  },
  created() {
    this.__init()
  },
  methods: {
    // 初始化数据
    __init() {
      this.$layout.showLoading()
      this.$store.dispatch('type/getTypeList').then((res) => {
        this.page.total = res.length
      })
      this.$layout.hideLoading()
    },
    showDialog(data) {
      this.$refs.typeDialog.showDialog(data)
    },
  },
}
</script>

<style scoped></style>
