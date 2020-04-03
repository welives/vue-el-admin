<template>
  <div>
    <button-search ref="buttonSearch">
      <template #left>
        <router-link :to="{ name: 'shop_goods_add' }" class="mr-2">
          <el-button type="primary" size="mini">发布商品</el-button>
        </router-link>
        <el-popconfirm
          title="是否删除选中的商品？"
          @onConfirm="deleteAll('goods/DELETE_batch')"
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
          placeholder="输入商品名称或编码进行搜索"
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
            <el-form-item label="商品名称" prop="title">
              <el-input
                v-model="search.title"
                placeholder="商品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品编码" prop="serial">
              <el-input
                v-model="search.serial"
                placeholder="商品编码"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="cate">
              <el-select v-model="search.cate" placeholder="请选择" size="mini">
                <el-option
                  v-for="(item, index) in cate"
                  :key="index"
                  :label="item"
                  :value="index"
                >
                </el-option>
              </el-select>
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
    <el-table
      :data="getCurPageData"
      border
      class="mt-2"
      @selection-change="chooseData"
    >
      <el-table-column type="selection" width="40" align="center">
      </el-table-column>
      <el-table-column
        #default="scope"
        label="商品"
        width="350"
        header-align="center"
      >
        <div class="media d-flex align-items-center justify-content-center">
          <img
            class="mr-3"
            :src="scope.row.cover"
            style="width: 60px; cursor: pointer;"
          />
          <div class="media-body">
            <p class="mb-0 font-weight-bold text-primary">
              {{ scope.row.title }}
            </p>
            <div class="mb-0 text-muted">
              <small>分类: {{ cate[scope.row.cate] }}</small>
            </div>
            <div class="mb-0 text-muted">
              <small>编码: {{ scope.row.serial }}</small>
            </div>
          </div>
        </div>
      </el-table-column>
      <el-table-column
        #default="scope"
        label="审核状态"
        align="center"
        width="100"
      >
        <div class="d-flex flex-column" v-if="!scope.row.isChecked">
          <el-button
            type="success"
            @click="scope.row.isChecked = 1"
            size="mini"
            plain
            >审核通过</el-button
          >
          <el-button
            class="ml-0 mt-2"
            type="danger"
            @click="scope.row.isChecked = 2"
            size="mini"
            plain
            >审核拒绝</el-button
          >
        </div>
        <span
          v-else
          class="badge"
          :class="scope.row.isChecked === 1 ? 'badge-success' : 'badge-danger'"
          >{{ scope.row.isChecked === 1 ? '通过' : '拒绝' }}</span
        >
      </el-table-column>
      <el-table-column
        prop="sale_count"
        label="实际销量(件)"
        align="center"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="stock"
        label="总库存(件)"
        align="center"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格(元)"
        align="center"
        width="120"
      ></el-table-column>
      <el-table-column
        #default="scope"
        label="是否上架"
        align="center"
        width="80"
      >
        <el-switch
          v-model="scope.row.isPutaway"
          active-color="#13ce66"
          @change="putaway(scope)"
        >
        </el-switch>
      </el-table-column>
      <el-table-column #default="scope" label="操作" align="center">
        <el-button type="text" size="mini">基础设置</el-button>
        <el-button type="text" size="mini">商品规格</el-button>
        <el-button type="text" size="mini">商品属性</el-button>
        <el-button
          type="text"
          size="mini"
          @click="navigate('shop_goods_banner', scope.row.id)"
          >媒体设置</el-button
        >
        <el-button
          type="text"
          size="mini"
          @click="navigate('shop_goods_content', scope.row.id)"
          >商品详情</el-button
        >
        <el-button type="text" size="mini">折扣设置</el-button>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="height: 60px;"></div>
    <el-footer
      class="border-top d-flex align-items-center px-0 bg-white fixed-bottom"
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
import { mapState } from 'vuex'
export default {
  name: 'allGoods',
  inject: ['$layout'],
  components: {
    buttonSearch,
  },
  mixins: [common],
  data() {
    return {
      search: {
        title: '',
        serial: '',
        cate: 0,
      },
      cate: ['分类一', '分类二', '分类三', '分类四'],
    }
  },
  computed: {
    ...mapState({
      dataList: (state) => state.goods.goodsList,
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
        if (typeof value !== 'object') {
          searchList = searchList.filter((v) => {
            if (String(v.serial).indexOf(this.keyword) !== -1) {
              return v
            } else if (v.title.indexOf(this.keyword) !== -1) {
              return v
            }
          })
        } else {
          let { title, serial, cate } = value
          if (title) {
            searchList = searchList.filter((v) => {
              if (v.title === title) {
                return v
              }
            })
          }
          if (serial) {
            searchList = searchList.filter((v) => {
              if (v.serial === Number(serial)) {
                return v
              }
            })
          }
          if (cate) {
            searchList = searchList.filter((v) => {
              if (v.cate === cate) {
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
    keyword(e) {
      this.getCurPageData = e.trim()
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
      this.$store.dispatch('goods/getGoodsList').then((res) => {
        this.page.total = res.length
      })
      this.$layout.hideLoading()
    },
    putaway(data) {
      this.$store.commit('goods/UPDATE_putway', data)
    },
    navigate(name, id) {
      this.$router.push({
        name,
        params: { id },
      })
    },
  },
}
</script>

<style scoped></style>
