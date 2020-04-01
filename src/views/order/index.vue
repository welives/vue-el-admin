<template>
  <div class="bg-white px-3" style="margin: 0 -20px 40px;">
    <el-tabs v-model="tabIndex" @tab-click="tabClick">
      <el-tab-pane
        v-for="(tab, index) in tabBars"
        :key="index"
        :label="tab.name"
      >
        <button-search ref="buttonSearch" :key="index" :showSearch="true">
          <template #left>
            <el-popconfirm
              title="是否删除选中的数据？"
              @onConfirm="deleteAll('order/DELETE_batch')"
            >
              <el-button slot="reference" type="danger" size="mini" v-auth
                >批量删除</el-button
              >
            </el-popconfirm>
          </template>
          <template #right>
            <el-input
              v-model="keyword"
              size="mini"
              class="mr-2 w-50"
              placeholder="请输入订单编号"
            ></el-input>
            <el-button
              size="mini"
              @click="$refs.buttonSearch[index].advancedSearch = true"
              >高级搜索<i class="el-icon-arrow-down el-icon--right"></i
            ></el-button>
          </template>
          <template #form>
            <el-form
              v-if="index == tabIndex"
              ref="searchForm"
              inline
              :model="search"
              label-width="80px"
              size="mini"
            >
              <div class="d-flex align-items-center flex-wrap">
                <el-form-item label="订单编号" prop="serial">
                  <el-input
                    v-model="search.serial"
                    placeholder="要搜索的订单编号"
                  ></el-input>
                </el-form-item>
                <el-form-item label="买家" prop="username">
                  <el-input v-model="search.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="search.phone"></el-input>
                </el-form-item>
                <el-form-item label="下单时间" prop="time">
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
                </el-form-item>
              </div>
              <el-form-item class="float-right">
                <el-button type="info" @click="advancedSearch">搜索</el-button>
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
              v-if="scope.row.payType === 'wechat' && !scope.row.closed"
              class="badge badge-success"
              >微信支付</span
            >
            <span
              v-else-if="scope.row.payType === 'alipay' && !scope.row.closed"
              class="badge badge-primary"
              >支付宝</span
            >
            <span v-else class="badge badge-secondary">未支付</span>
          </el-table-column>
          <el-table-column
            #default="scope"
            label="配送方式"
            align="center"
            width="80"
          >
            <span v-if="!scope.row.closed && scope.row.status > 1">{{
              scope.row.express
            }}</span>
          </el-table-column>
          <el-table-column
            #default="scope"
            label="交易状态"
            align="center"
            width="150"
          >
            <div v-if="!scope.row.closed && !scope.row.refunding">
              <div>
                <span>付款状态: </span>
                <span
                  class="badge"
                  :class="
                    scope.row.status < 1 ? 'badge-secondary' : 'badge-success'
                  "
                  >{{ scope.row.status &lt 1 ? '待付款' : '已付款' }}</span
                >
              </div>
              <div>
                <span>发货状态: </span>
                <span
                  class="badge"
                  :class="
                    scope.row.status < 2 ? 'badge-secondary' : 'badge-success'
                  "
                  >{{ scope.row.status &lt 2 ? '待发货' : '已发货' }}</span
                >
              </div>
              <div>
                <span>收货状态: </span>
                <span
                  class="badge"
                  :class="
                    scope.row.status < 3 ? 'badge-secondary' : 'badge-success'
                  "
                  >{{ scope.row.status &lt 3 ? '待收货' : '已收货' }}</span
                >
              </div>
              <div>
                <span>评价状态: </span>
                <span
                  class="badge"
                  :class="
                    scope.row.status === 4 ? 'badge-success' : 'badge-secondary'
                  "
                  >{{ scope.row.status === 4 ? '已评价' : '未评价' }}</span
                >
              </div>
            </div>
            <div v-else>
              <div v-if="scope.row.closed">
                <span class="badge badge-danger">已关闭</span>
              </div>
              <div v-else-if="scope.row.refunding">
                <span class="badge badge-danger">退款中</span>
              </div>
            </div>
          </el-table-column>
          <el-table-column
            #default="scope"
            label="操作"
            align="center"
            width="120"
          >
            <el-button
              type="primary"
              size="mini"
              plain
              class="mr-2"
              @click="showShipDialog(scope)"
              v-if="
                !scope.row.closed &&
                  !scope.row.refunding &&
                  scope.row.status === 1
              "
              >发货</el-button
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
    <el-dialog
      title="发货"
      :visible.sync="shipDialog"
      width="40vw"
      @close="hide"
    >
      <el-form
        :model="shipForm"
        label-width="100px"
        class="d-flex flex-wrap align-items-center"
      >
        <el-form-item label="请选择快递" class="w-100">
          <el-select
            v-model="shipForm.express"
            placeholder="请选择"
            size="medium"
            class="w-50"
          >
            <el-option
              v-for="(item, index) in express"
              :key="index"
              :label="item"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" class="w-75">
          <el-input
            v-model="shipForm.serial"
            placeholder="请输入快递单号"
            size="medium"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="shipDialog = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitShip" size="medium"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      keyword: '',
      search: {
        serial: '',
        time: '',
        username: '',
        phone: '',
      },
      shipForm: {
        express: '',
        serial: '',
      },
      editIndex: -1,
      searchList: [],
      shipDialog: false,
      express: [
        '顺丰快递',
        '圆通快递',
        '申通快递',
        '中通快递',
        '百世快递',
        '韵达快递',
        '京东快递',
        '天天快递',
        '中国邮政',
        '宅急送',
        '全峰快递',
      ],
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
          this.searchList.length || this.curTab !== 'all' || this.keyword
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
      // 0未付款,1已付款,2已发货,3已收货,4已完成
      set(value) {
        let searchList = this.dataList
        // 先在当前tab进行搜索
        searchList = this.curTabData(this.curTab, searchList)
        // 高级搜索
        if (typeof value === 'object') {
          let { serial, username, phone, time } = value
          if (serial) {
            searchList = searchList.filter((v) => {
              if (v.serial === Number(serial)) {
                return v
              }
            })
          }
          if (username) {
            searchList = searchList.filter((v) => {
              if (v.username === username) {
                return v
              }
            })
          }
          if (phone) {
            searchList = searchList.filter((v) => {
              if (v.phone === phone) {
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
          // 简单搜索
          if (this.keyword) {
            searchList = searchList.filter((v) => {
              if (String(v.serial).indexOf(this.keyword) !== -1) {
                return v
              }
            })
          }
        }
        this.searchList = searchList.length ? searchList : []
        this.page.current = 1
        this.page.total = searchList.length
      },
    },
  },
  watch: {
    curTab() {
      this.getCurPageData = ''
    },
    keyword(value) {
      this.getCurPageData = value.trim()
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
      this.$refs.buttonSearch.filter((v) => {
        if (v.advancedSearch) {
          this.resetForm('searchForm')
          v.advancedSearch = false
        }
      })
    },
    showShipDialog(data) {
      this.editIndex = this.dataList.findIndex((v) => v.id === data.row.id)
      this.shipDialog = true
    },
    hide() {
      this.shipForm = {
        express: '',
        serial: '',
      }
      this.editIndex = -1
      this.shipDialog = false
    },
    submitShip() {
      this.shipForm.express = this.express[this.shipForm.express]
      this.$store.commit('order/DO_ship', {
        index: this.editIndex,
        data: this.shipForm,
      })
      this.hide()
      this.getCurPageData = ''
    },
    advancedSearch() {
      this.getCurPageData = this.search
    },
    resetForm(formName) {
      this.$refs[formName][0].resetFields()
      this.getCurPageData = ''
    },
    curTabData(tab, searchList) {
      if (tab !== 'closed') {
        searchList = searchList.filter((v) => {
          if (!v.closed) {
            return v
          }
        })
        if (tab === 'nopay') {
          searchList = searchList.filter((v) => {
            if (v.status === 0 && !v.refunding) {
              return v
            }
          })
        } else if (tab === 'noship') {
          searchList = searchList.filter((v) => {
            if (v.status === 1 && !v.refunding) {
              return v
            }
          })
        } else if (tab === 'shiped') {
          searchList = searchList.filter((v) => {
            if (v.status === 2 && !v.refunding) {
              return v
            }
          })
        } else if (tab === 'received') {
          searchList = searchList.filter((v) => {
            if (v.status === 3 && !v.refunding) {
              return v
            }
          })
        } else if (tab === 'finish') {
          searchList = searchList.filter((v) => {
            if (v.status === 4 && !v.refunding) {
              return v
            }
          })
        } else if (tab === 'refunding') {
          searchList = searchList.filter((v) => {
            if (v.refunding) {
              return v
            }
          })
        }
      } else {
        searchList = searchList.filter((v) => {
          if (v.closed) {
            return v
          }
        })
      }
      return searchList
    },
    // 批量删除
    deleteAll(mutations) {
      const list = this.dataList.filter((type) => {
        return !this.chooseList.some((v) => v.id === type.id)
      })
      this.$store.commit(mutations, list)
      if (this.curTab === 'all') {
        if (!this.getCurPageData) {
          const totalPage = Math.ceil(this.dataList.length / this.page.size)
          if (totalPage < this.page.current) {
            this.page.current--
          }
        }
        this.page.total = this.dataList.length
      } else {
        this.searchList = this.searchList.filter((type) => {
          return !this.chooseList.some((v) => v.id === type.id)
        })
        if (!this.getCurPageData) {
          const totalPage = Math.ceil(this.searchList.length / this.page.size)
          if (totalPage < this.page.current) {
            this.page.current--
          }
        }
        this.page.total = this.searchList.length
      }
      this.chooseList = []
    },
  },
}
</script>

<style scoped></style>
