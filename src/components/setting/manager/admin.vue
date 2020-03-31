<template>
  <div>
    <button-search ref="buttonSearch">
      <template #left>
        <el-button type="primary" size="mini" @click="showDialog(false)"
          >添加管理员</el-button
        >
      </template>
      <template #right>
        <el-input
          v-model="keyword"
          placeholder="输入账号/手机号/邮箱进行搜索"
          size="mini"
          class="w-50"
        ></el-input>
      </template>
    </button-search>
    <!-- 表格数据 -->
    <el-table :data="getCurPageData" border class="mt-2">
      <el-table-column
        #default="scope"
        label="登录账号"
        align="center"
        min-width="200"
      >
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
      <el-table-column prop="phone" label="手机号" align="center" width="150">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" min-width="200">
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="所属用户组"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        #default="scope"
        label="创建/登录"
        align="center"
        width="250"
      >
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
          @change="statusChange('manager/UPDATE_status', scope)"
        ></el-switch>
      </el-table-column>
      <el-table-column #default="scope" label="操作" align="center" width="150">
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
          @onConfirm="deleteItem('manager/DELETE_single', scope)"
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
    <admin-dialog ref="adminDialog"></admin-dialog>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import adminDialog from '@/components/setting/manager/admin-dialog'
import common from '@/common/mixins/common'
import { mapState } from 'vuex'
export default {
  name: 'AdminList',
  inject: ['$layout'],
  components: {
    buttonSearch,
    adminDialog,
  },
  mixins: [common],
  data() {
    return {
      keyword: '',
      searchList: [],
    }
  },
  computed: {
    ...mapState({
      dataList: (state) => state.manager.adminList,
    }),
    getCurPageData: {
      get() {
        const curData = []
        const dataList =
          this.searchList.length || this.keyword
            ? this.searchList
            : this.dataList
        const totalPage = Math.ceil(dataList.length / this.page.size)
        for (let i = 0; i < totalPage; i++) {
          curData[i] = dataList.slice(
            this.page.size * i,
            this.page.size * (i + 1),
          )
        }
        return curData[this.page.current - 1]
      },
      set() {
        let searchList = this.dataList
        searchList = searchList.filter((v) => {
          if (v.username.indexOf(this.keyword) !== -1) {
            return v
          } else if (v.phone.indexOf(this.keyword) !== -1) {
            return v
          } else if (v.email.indexOf(this.keyword) !== -1) {
            return v
          }
        })
        this.searchList = searchList.length ? searchList : []
        this.page.current = 1
        this.page.total = searchList.length
      },
    },
  },
  watch: {
    keyword(value) {
      this.getCurPageData = value.trim()
    },
  },
  created() {
    this.__init()
  },
  methods: {
    __init() {
      this.$layout.showLoading()
      this.$store.dispatch('manager/getAdminList').then((res) => {
        this.page.total = res.length
      })
      this.$layout.hideLoading()
    },
    showDialog(data) {
      this.$refs.adminDialog.showDialog(data)
    },
  },
}
</script>

<style scoped></style>
