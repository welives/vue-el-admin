<template>
  <div class="bg-white px-3" style="margin: 0 -20px 40px;">
    <el-tabs v-model="tabIndex" @tab-click="tabClick">
      <el-tab-pane
        v-for="(tab, index) in tabBars"
        :key="index"
        :label="tab.name"
      >
        <button-search
          ref="buttonSearch"
          :key="index"
          placeholder="要搜索的订单编号"
          @search="searchEvent"
        >
          <template #left>
            <el-button type="primary" size="mini">导出数据</el-button>
            <el-button type="danger" size="mini">批量删除</el-button>
          </template>
          <template #form>
            <el-form
              v-if="index == tabIndex"
              ref="searchForm"
              inline
              :model="form"
              label-width="80px"
              size="mini"
            >
              <div class="d-flex align-items-center flex-wrap">
                <el-form-item label="订单编号" prop="serial">
                  <el-input
                    v-model="form.serial"
                    placeholder="要搜索的订单编号"
                  ></el-input>
                </el-form-item>
                <el-form-item label="订单状态" prop="status">
                  <el-select v-model="form.status" placeholder="请选择订单状态">
                    <el-option label="状态一" value="1"></el-option>
                    <el-option label="状态二" value="2"></el-option>
                    <el-option label="状态三" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="下单时间" prop="time">
                  <el-date-picker
                    v-model="form.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="收货人" prop="username">
                  <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
              </div>
              <el-form-item class="float-right">
                <el-button type="info" @click="searchEvent">搜索</el-button>
                <el-button @click="resetForm('searchForm')"
                  >清空筛选条件</el-button
                >
              </el-form-item>
            </el-form>
          </template>
        </button-search>
        <!-- 表格数据 -->
        <el-table
          :data="tableData[index].list"
          border
          class="mt-2"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" align="center">
          </el-table-column>
          <el-table-column prop="id" label="ID" align="center" width="50">
          </el-table-column>
          <el-table-column
            #default="scope"
            label="商品信息"
            header-align="center"
          >
            <div class="d-flex align-items-center mb-2">
              <div class="flex-fill">
                <div>订单编号</div>
                <small>{{ scope.row.serial }}</small>
              </div>
              <div class="flex-fill">
                <div>下单时间</div>
                <small>{{ scope.row.create_time }}</small>
              </div>
            </div>
            <div class="media d-flex align-items-center justify-content-center">
              <img class="mr-3" :src="scope.row.cover" style="width: 48px;" />
              <div class="media-body">
                <span class="font-weight-bold text-primary">
                  {{ scope.row.title }}
                </span>
              </div>
            </div>
          </el-table-column>
          <el-table-column
            #default="scope"
            label="实付款"
            align="center"
            width="120"
          >
            <div>
              <span>￥{{ scope.row.payment }}</span>
              <div>
                <small>(含运费: ￥{{ scope.row.freight }})</small>
              </div>
            </div>
          </el-table-column>
          <el-table-column
            #default="scope"
            label="买家"
            align="center"
            width="100"
          >
            <div>
              <span>{{ scope.row.username }}</span>
              <div>
                <small>(用户ID: {{ scope.row.uid }})</small>
              </div>
            </div>
          </el-table-column>
          <el-table-column
            #default="scope"
            label="支付方式"
            align="center"
            width="100"
          >
            <span v-if="scope.row.payType === 0" class="badge badge-success"
              >微信支付</span
            >
            <span v-else class="badge badge-primary"
              >支付宝</span
            ></el-table-column
          >
          <el-table-column
            prop="express"
            label="配送方式"
            align="center"
            width="80"
          >
          </el-table-column>
          <el-table-column
            #default="scope"
            label="交易状态"
            align="center"
            width="150"
          >
            <div>
              付款状态:
              <span
                class="badge"
                :class="[
                  scope.row.status < 1 ? 'badge-secondary' : 'badge-success'
                ]"
                >{{ scope.row.status &lt 1 ? '未付款' : '已付款' }}</span
              >
            </div>
            <div>
              发货状态:
              <span
                class="badge"
                :class="[
                  scope.row.status < 2 ? 'badge-secondary' : 'badge-success'
                ]"
                >{{ scope.row.status &lt 2 ? '待发货' : '已发货' }}</span
              >
            </div>
            <div>
              收货状态:
              <span
                class="badge"
                :class="[
                  scope.row.status < 3 ? 'badge-secondary' : 'badge-success'
                ]"
                >{{ scope.row.status &lt 3 ? '待收货' : '已收货' }}</span
              >
            </div>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <el-button type="primary" size="mini" plain class="mr-2"
              >订单详情</el-button
            >
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
              :current-page="tableData[index].currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </el-footer>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import common from '@/common/mixins/common.js'
import buttonSearch from '@/components/common/button-search'
export default {
  name: 'Order',
  components: {
    buttonSearch
  },
  mixins: [common],
  data() {
    return {
      tabIndex: 0,
      currentPage: 1,
      tabBars: [
        { name: '全部' },
        { name: '待付款' },
        { name: '待发货' },
        { name: '已发货' },
        { name: '已收货' },
        { name: '已完成' },
        { name: '已关闭' },
        { name: '退款中' }
      ],
      form: {
        serial: '',
        status: '',
        time: '',
        username: '',
        phone: ''
      },
      tableData: [],
      multipleSelection: []
    }
  },
  created() {
    this.__initTabBar(this.$options.name)
    this.__getData()
  },
  methods: {
    __getData() {
      for (let i = 0; i < this.tabBars.length; i++) {
        this.tableData.push({
          currentPage: 1,
          list: []
        })
        for (let j = 0; j < 10; j++) {
          this.tableData[i].list.push({
            id: j,
            uid: Math.floor(Math.random() * 1000 + 1),
            username: '用户 ' + i + ' - ' + j,
            title: 'iPhone X ' + i + ' - ' + j,
            cover:
              'https://img10.360buyimg.com/n1/s450x450_jfs/t1/99856/30/11456/249736/5e33b2d2E8d404e63/a1da190926517d79.jpg',
            serial: Math.floor(Math.random() * 1000000000),
            create_time: '2020-02-02 12:12:12',
            payment: (Math.random() * 100 + 1).toFixed(2),
            freight: (Math.random() * 10 + 1).toFixed(2),
            express: '顺丰快递',
            payType: Math.floor(Math.random() * (1 - 0 + 1)) + 0,
            status: Math.floor(Math.random() * (3 - 0 + 1)) + 0
          })
        }
      }
    },
    tabClick() {
      this.$refs.buttonSearch.filter((v, index) => {
        if (index.toString() !== this.tabIndex) {
          v.advancedSearch = false
        }
      })
    },
    searchEvent(e) {
      if (typeof e === 'string') {
        return console.log('简单搜索', e)
      }
      console.log('高级搜索', e)
    },
    resetForm(formName) {
      this.$refs[formName][0].resetFields()
    },
    deleteItem(index) {
      this.tableData[this.tabIndex].list.splice(index, 1)
    },
    putaway(item) {
      item.isPutaway = !item.isPutaway
      this.$message({
        message: item.isPutaway ? '上架' : '下架',
        type: 'success'
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped></style>
