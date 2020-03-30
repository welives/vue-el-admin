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
            <el-button type="primary" size="mini" class="mr-2"
              >导出数据</el-button
            >
            <el-popconfirm
              title="是否删除选中的数据？"
              @onConfirm="deleteAll('order/DELETE_batch')"
            >
              <el-button slot="reference" type="danger" size="mini" v-auth
                >批量删除</el-button
              >
            </el-popconfirm>
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
                <el-form-item label="买家" prop="username">
                  <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone"></el-input>
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
          :data="getCurPageData"
          border
          class="mt-2"
          @selection-change="chooseData"
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
            <div class="d-flex align-items-center justify-content-center mb-2">
              <div class="flex-fill">
                <div>订单编号</div>
                <small>{{ scope.row.serial }}</small>
              </div>
              <div class="flex-fill">
                <div>下单时间</div>
                <small>{{ scope.row.createTime }}</small>
              </div>
            </div>
            <div class="media d-flex align-items-center justify-content-center">
              <img
                class="mr-3"
                :src="scope.row.cover"
                style="width: 48px; cursor: pointer;"
              />
              <div class="media-body">
                <span class="font-weight-bold text-primary">
                  {{ scope.row.title }}
                </span>
              </div>
            </div>
          </el-table-column>
          <el-table-column
            #default="scope"
            label="买家"
            align="center"
            width="150"
          >
            <div>
              <span>{{ scope.row.username }}</span>
              <div>
                <small class="text-muted"
                  >手机号: <small>{{ scope.row.phone }}</small></small
                >
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
            label="支付方式"
            align="center"
            width="100"
          >
            <span
              v-if="scope.row.payType === 'wechat'"
              class="badge badge-success"
              >微信支付</span
            >
            <span
              v-else-if="scope.row.payType === 'alipay'"
              class="badge badge-primary"
              >支付宝</span
            >
            <span v-else class="badge badge-secondary">未支付</span>
          </el-table-column>
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
                  scope.row.status < 1 ? 'badge-secondary' : 'badge-success',
                ]"
                >{{ scope.row.status &lt 1 ? '未付款' : '已付款' }}</span
              >
            </div>
            <div>
              发货状态:
              <span
                class="badge"
                :class="[
                  scope.row.status < 2 ? 'badge-secondary' : 'badge-success',
                ]"
                >{{ scope.row.status &lt 2 ? '待发货' : '已发货' }}</span
              >
            </div>
            <div>
              收货状态:
              <span
                class="badge"
                :class="[
                  scope.row.status < 3 ? 'badge-secondary' : 'badge-success',
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import common from '@/common/mixins/common.js'
import { mapState } from 'vuex'
export default {
  name: 'Order',
  inject: ['$layout'],
  components: {
    buttonSearch,
  },
  mixins: [common],
  data() {
    return {
      tabBars: [
        { name: '全部', key: 'all' },
        { name: '待付款', key: 'nopay' },
        { name: '待发货', key: 'noship' },
        { name: '已发货', key: 'shiped' },
        { name: '已收货', key: 'received' },
        { name: '已完成', key: 'finish' },
        { name: '已关闭', key: 'closed' },
        { name: '退款中', key: 'refunding' },
      ],
      form: {
        serial: '',
        time: '',
        username: '',
        phone: '',
      },
      searchList: [],
    }
  },
  computed: {
    ...mapState({
      dataList: (state) => state.order.orderList,
    }),
    curTab() {
      return this.tabBars[this.tabIndex].key
    },
    getCurPageData: {
      get() {
        const curData = []
        const dataList =
          this.searchList.length || this.curTab !== 'all'
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
      // 0未付款,1已付款,2已发货,3已收货,4已完成,5已关闭
      set(value) {
        let searchList = this.dataList
        if (value === 'nopay') {
          searchList = searchList.filter((v) => {
            if (v.status === 0) {
              return v
            }
          })
        } else if (value === 'noship') {
          searchList = searchList.filter((v) => {
            if (v.status === 1) {
              return v
            }
          })
        } else if (value === 'shiped') {
          searchList = searchList.filter((v) => {
            if (v.status === 2) {
              return v
            }
          })
        } else if (value === 'received') {
          searchList = searchList.filter((v) => {
            if (v.status === 3) {
              return v
            }
          })
        } else if (value === 'finish') {
          searchList = searchList.filter((v) => {
            if (v.status === 4) {
              return v
            }
          })
        } else if (value === 'closed') {
          searchList = searchList.filter((v) => {
            if (v.status === 5) {
              return v
            }
          })
        } else if (value === 'refunding') {
          searchList = searchList.filter((v) => {
            if (v.status === 6) {
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
    curTab(e) {
      this.getCurPageData = e
    },
  },
  created() {
    this.__initTabBar()
    this.__init()
  },
  methods: {
    __init() {
      this.$layout.showLoading()
      this.$store.dispatch('order/getOrderList').then((res) => {
        this.page.total = res.length
      })
      this.$layout.hideLoading()
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
  },
}
</script>

<style scoped></style>
