<template>
  <div class="bg-white px-3 mt-2" style="margin: 0 -20px 40px;">
    <button-search ref="buttonSearch" :showSearch="true">
      <template #left>
        <el-button type="primary" size="mini" @click="showDialog(false)"
          >添加会员</el-button
        >
      </template>
      <template #right>
        <el-input
          v-model="keyword"
          size="mini"
          class="mr-2 w-50"
          placeholder="请输入用户名/手机号/邮箱进行搜索"
        ></el-input>
        <el-button
          type="primary"
          size="mini"
          @click="$refs.buttonSearch.advancedSearch = true"
          >高级搜索<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
      </template>
      <template #form>
        <el-form
          ref="searchForm"
          inline
          :model="search"
          label-width="80px"
          size="mini"
        >
          <div class="d-flex align-items-center">
            <el-form-item label="关键字" prop="keyword">
              <el-input
                v-model="search.keyword"
                placeholder="用户名/手机号/邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="会员等级" prop="level">
              <el-select v-model="search.level" placeholder="请选择会员等级">
                <el-option
                  v-for="(item, index) in levelName"
                  :label="item"
                  :value="index"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="注册时间" prop="time">
              <el-date-picker
                v-model="search.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <el-form-item class="float-right">
            <el-button type="info" @click="advancedSearch">搜索</el-button>
            <el-button @click="resetForm('searchForm')">清空筛选条件</el-button>
          </el-form-item>
        </el-form>
      </template>
    </button-search>
    <!-- 表格数据 -->
    <el-table :data="getCurPageData" border class="mt-2">
      <el-table-column prop="id" label="ID" width="60" align="center">
      </el-table-column>
      <el-table-column #default="scope" label="会员" align="center">
        <div class="media d-flex align-items-center justify-content-center">
          <img
            class="mr-2 rounded-circle"
            :src="scope.row.avatar"
            style="width: 32px;"
          />
          <div class="media-body flex-grow-0">
            <el-button type="text"
              >{{ scope.row.username }}({{ sex[scope.row.sex] }})</el-button
            >
          </div>
        </div>
        <div>
          <small class="text-muted"
            >手机号: <small>{{ scope.row.phone }}</small></small
          >
        </div>
        <div>
          <small class="text-muted"
            >会员昵称: <small>{{ scope.row.nickname }}</small></small
          >
        </div>
      </el-table-column>
      <el-table-column
        #default="scope"
        label="会员等级"
        align="center"
        width="150"
      >
        {{ levelName[scope.row.level] }}
      </el-table-column>
      <el-table-column
        #default="scope"
        label="注册/登录"
        align="center"
        width="250"
      >
        <div>
          注册时间: <small>{{ scope.row.createTime }}</small>
        </div>
        <div>
          最后登录: <small>{{ scope.row.lastTime }}</small>
        </div>
      </el-table-column>
      <el-table-column
        #default="scope"
        label="状态"
        header-align="center"
        width="100"
      >
        <div class="d-flex align-items-center justify-content-center">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            @change="statusChange('users/UPDATE_status', scope)"
          ></el-switch>
        </div>
      </el-table-column>
      <el-table-column #default="scope" label="操作" align="center" width="150">
        <el-button type="warning" size="mini" plain @click="showDialog(scope)"
          >修改</el-button
        >
        <el-popconfirm
          class="ml-2"
          title="是否删除该会员？"
          @onConfirm="deleteItem('users/DELETE_single', scope)"
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
          :total="page.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="pageSizeChange"
          @current-change="curPageChange"
        ></el-pagination>
      </div>
    </el-footer>
    <!-- 添加用户对话框 -->
    <user-dialog ref="userDialog"></user-dialog>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import userDialog from '@/components/user/user-dialog'
import common from '@/common/mixins/common.js'
import { mapState } from 'vuex'
export default {
  name: 'User',
  inject: ['$layout'],
  components: {
    buttonSearch,
    userDialog,
  },
  mixins: [common],
  data() {
    return {
      search: {
        keyword: '',
        level: 0,
        time: [],
      },
      levelName: ['普通会员', 'VIP会员', '白银会员', '黄金会员', '钻石会员'],
      sex: ['保密', '男', '女'],
    }
  },
  computed: {
    ...mapState({
      dataList: (state) => state.users.userList,
    }),
    getCurPageData: {
      get() {
        const curData = []
        const dataList =
          this.searchList.length || this.keyword || this.isAdvancedSearch
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
      set(value) {
        let searchList = this.dataList
        if (typeof value === 'object') {
          let { keyword, level, time } = value
          keyword = keyword.trim()
          if (keyword) {
            searchList = searchList.filter((v) => {
              if (v.username === keyword) {
                return v
              } else if (v.phone === Number(keyword)) {
                return v
              } else if (v.email === keyword) {
                return v
              }
            })
          }
          if (level > 0) {
            searchList = searchList.filter((v) => {
              if (v.level === level) {
                return v
              }
            })
          } else {
            searchList = searchList.filter((v) => {
              if (v.level === 0) {
                return v
              }
            })
          }
          if (time.length) {
            const from = new Date(time[0]).getTime()
            const to = new Date(time[1]).getTime()
            searchList = searchList.filter((v) => {
              const target = new Date(v.createTime).getTime()
              if (target >= from && target <= to) {
                return v
              }
            })
          }
        } else {
          searchList = searchList.filter((v) => {
            if (v.username.indexOf(this.keyword) !== -1) {
              return v
            } else if (v.nickname.indexOf(this.keyword) !== -1) {
              return v
            } else if (v.phone.indexOf(this.keyword) !== -1) {
              return v
            }
          })
        }
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
    this.$on('advanced', (e) => {
      this.isAdvancedSearch = e
      this.resetForm('searchForm')
    })
  },
  methods: {
    __init() {
      this.$layout.showLoading()
      this.$store.dispatch('users/getUserList').then((res) => {
        this.page.total = res.length
      })
      this.$layout.hideLoading()
    },
    showDialog(data) {
      this.$refs.userDialog.showDialog(data)
    },
  },
}
</script>

<style scoped></style>
