<template>
  <div class="bg-white px-3 mt-2" style="margin: 0 -20px 40px;">
    <button-search ref="buttonSearch" :showSearch="true">
      <template #left>
        <el-popconfirm title="是否删除选中的数据？" @onConfirm="deleteAll">
          <el-button slot="reference" type="danger" size="mini"
            >批量删除</el-button
          >
        </el-popconfirm>
      </template>
      <template #right>
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="mr-2"
          size="mini"
        >
        </el-date-picker>
        <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
        <el-button size="mini" @click="advancedSearch"
          >高级搜索<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
      </template>
      <template #form>
        <el-form
          ref="searchForm"
          inline
          :model="form"
          label-width="80px"
          size="mini"
        >
          <div class="d-flex align-items-center">
            <el-form-item label="评价用户" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="评价类型" prop="type">
              <el-select v-model="form.type" placeholder="">
                <el-option label="选项一" value="1"></el-option>
                <el-option label="选项二" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间" prop="time">
              <el-date-picker
                v-model="form.time"
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
    <el-table
      :data="tableData"
      border
      class="mt-2"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" align="center">
      </el-table-column>
      <el-table-column type="expand" #default="scope">
        <div class="media">
          <img
            style="height: 48px; width: 48px;"
            class="mr-3 rounded-circle"
            src="http://imgs.aixifan.com/cms/2017-12-05/1512447096114.jpg"
          />
          <div class="media-body">
            <div class="d-flex align-items-center">
              <small class="text-danger mr-2">{{ scope.row.username }}</small>
              <small class="text-muted"
                >发表于<span class="ml-2">{{
                  scope.row.commentTime
                }}</span></small
              >
              <el-button type="danger" size="mini" class="ml-auto"
                >删除</el-button
              >
            </div>
            <span>评论内容:</span>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin. Cras purus odio, vestibulum in
            vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
            vulputate fringilla. Donec lacinia congue felis in faucibus.
            <div class="media mt-3">
              <a class="pr-3" href="#">
                <img
                  class="rounded-circle"
                  style="height: 48px; width: 48px;"
                  src="http://imgs.aixifan.com/cms/2017-12-05/1512447096114.jpg"
                />
              </a>
              <div class="media-body">
                <div class="d-flex align-items-center">
                  <small class="text-danger mr-2">客服</small>
                  <small class="text-muted"
                    >回复于<span class="ml-2">{{
                      scope.row.commentTime
                    }}</span></small
                  >
                  <el-button type="danger" size="mini" class="ml-auto"
                    >删除</el-button
                  >
                </div>
                <span>回复内容:</span>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                nisi vulputate fringilla. Donec lacinia congue felis in
                faucibus.
              </div>
            </div>
          </div>
        </div>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="60" align="center">
      </el-table-column>
      <el-table-column
        #default="scope"
        label="商品"
        width="350"
        header-align="center"
      >
        <div class="media d-flex align-items-center justify-content-center">
          <img class="mr-3" :src="scope.row.cover" style="width: 60px;" />
          <div class="media-body">
            <p class="mb-0 font-weight-bold text-primary">
              {{ scope.row.title }}
            </p>
          </div>
        </div>
      </el-table-column>
      <el-table-column #default="scope" label="评价信息" header-align="center">
        <div class="d-flex flex-column">
          <div class="mb-1">
            用户名:
            <span class="ml-1">{{ scope.row.username }}</span>
          </div>
          <div class="d-flex align-items-center">
            评分:<el-rate
              v-model="scope.row.star"
              disabled
              show-score
              class="d-inline ml-1"
            ></el-rate>
          </div>
        </div>
      </el-table-column>
      <el-table-column label="评价时间" prop="commentTime" align="center">
      </el-table-column>
      <el-table-column
        #default="scope"
        label="是否显示"
        align="center"
        width="150"
      >
        <el-switch
          v-model="scope.row.isShow"
          active-color="#13ce66"
        ></el-switch>
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
  name: 'Comment',
  components: {
    buttonSearch,
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          title: 'iPhone X',
          cover:
            'https://img10.360buyimg.com/n1/s450x450_jfs/t1/99856/30/11456/249736/5e33b2d2E8d404e63/a1da190926517d79.jpg',
          username: '煎蛋',
          star: 4.4,
          commentTime: '2020-03-05 11:43:31',
          isShow: true,
        },
      ],
      currentPage: 1,
      multipleSelection: [],
      form: {
        username: '',
        type: '',
        time: '',
      },
    }
  },
  methods: {
    searchEvent(e) {
      console.log(e)
    },
    advancedSearch() {
      this.$refs.buttonSearch.advancedSearch = true
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
