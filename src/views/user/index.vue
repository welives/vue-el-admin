<template>
  <div class="bg-white px-3 mt-2" style="margin: 0 -20px 40px;">
    <button-search
      ref="buttonSearch"
      :showSearch="true"
      placeholder="手机号/邮箱/会员昵称"
      @search="searchEvent"
    >
      <template #left>
        <el-button type="primary" size="mini" @click="showDialog(false)"
          >添加会员</el-button
        >
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
            <el-form-item label="搜索内容" prop="keyword">
              <el-input
                v-model="search.keyword"
                placeholder="手机号/邮箱/会员昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="会员等级" prop="level">
              <el-select v-model="search.level" placeholder="请选择会员等级">
                <el-option label="普通会员" :value="0"></el-option>
                <el-option label="VIP会员" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="注册时间" prop="createTime">
              <el-date-picker
                v-model="search.createTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <el-form-item class="float-right">
            <el-button type="info" @click="searchEvent">搜索</el-button>
            <el-button @click="resetForm('searchForm')">清空筛选条件</el-button>
          </el-form-item>
        </el-form>
      </template>
    </button-search>
    <!-- 表格数据 -->
    <el-table :data="tableData" border class="mt-2">
      <el-table-column prop="id" label="ID" width="60" align="center">
      </el-table-column>
      <el-table-column
        #default="scope"
        label="会员"
        header-align="center"
        width="150"
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
      <el-table-column
        #default="scope"
        label="会员等级"
        align="center"
        width="120"
      >
        {{ scope.row.level | getLevelName }}
      </el-table-column>
      <el-table-column #default="scope" label="注册/登录" align="center">
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
          ></el-switch>
        </div>
      </el-table-column>
      <el-table-column #default="scope" label="操作" align="center" width="250">
        <el-button type="warning" size="mini" plain @click="showDialog(scope)"
          >修改</el-button
        >
        <el-button type="warning" size="mini" plain class="mr-2"
          >重置密码</el-button
        >
        <el-popconfirm
          title="是否删除该会员？"
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
    <!-- 添加用户对话框 -->
    <user-dialog ref="userDialog"></user-dialog>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import userDialog from '@/components/user/user-dialog'
export default {
  name: 'User',
  components: {
    buttonSearch,
    userDialog,
  },
  filters: {
    getLevelName(value) {
      return value === 0 ? '普通会员' : value === 1 ? 'VIP会员' : ''
    },
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          username: '煎蛋',
          nickname: '',
          phone: '',
          email: '',
          sex: 0,
          avatar: 'http://imgs.aixifan.com/cms/2017-12-05/1512447096114.jpg',
          level: 0,
          createTime: '2020-03-05 11:43:31',
          lastTime: '2020-03-06 02:50:22',
          status: true,
        },
      ],
      currentPage: 1,
      search: {
        keyword: '',
        level: '',
        createTime: '',
      },
    }
  },
  methods: {
    showDialog(data) {
      this.$refs.userDialog.showDialog(data)
    },
    searchEvent(e) {
      if (typeof e === 'string') {
        return console.log('简单搜索', e)
      }
      console.log('高级搜索', e)
    },
    deleteItem(index) {
      this.tableData.splice(index, 1)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
