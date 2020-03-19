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
          placeholder="要搜索的商品名称"
          @search="searchEvent"
        >
          <template #left>
            <router-link :to="{ name: 'shop_goods_add' }" class="mr-2">
              <el-button type="primary" size="mini">发布商品</el-button>
            </router-link>
            <el-button type="warning" size="mini">恢复商品</el-button>
            <el-button type="danger" size="mini" v-auth>批量删除</el-button>
            <el-button size="mini">上架</el-button>
            <el-button size="mini">下架</el-button>
            <el-button size="mini">推荐</el-button>
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
              <div class="d-flex align-items-center">
                <el-form-item label="商品名称" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="商品编码" prop="code">
                  <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="商品类型" prop="type">
                  <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="cate">
                  <el-input v-model="form.cate"></el-input>
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
                <p class="mb-0">{{ scope.row.cate }}</p>
                <small class="mb-0 text-muted">{{
                  scope.row.create_time
                }}</small>
              </div>
            </div>
          </el-table-column>
          <el-table-column
            prop="type"
            label="商品类型"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="sale_count"
            label="实际销量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="order"
            label="商品排序"
            align="center"
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
              inactive-color="#ff4949"
              @change="putaway"
            >
            </el-switch>
          </el-table-column>
          <el-table-column
            prop="stock"
            label="总库存"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            align="center"
          ></el-table-column>
          <el-table-column
            #default="scope"
            label="操作"
            align="center"
            width="150"
          >
            <el-button type="warning" size="mini" plain class="mr-2"
              >编辑</el-button
            >
            <el-popconfirm
              title="是否删除这个商品？"
              @onConfirm="deleteItem(scope.$index)"
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
  name: 'Goods',
  components: {
    buttonSearch,
  },
  mixins: [common],
  data() {
    return {
      tabIndex: 0,
      currentPage: 1,
      tabBars: [
        { name: '审核中' },
        { name: '出售中' },
        { name: '已下架' },
        { name: '库存预警' },
        { name: '回收站' },
      ],
      form: {
        name: '',
        code: '',
        type: '',
        cate: '',
      },
      tableData: [],
      multipleSelection: [],
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
          list: [],
        })
        for (let j = 0; j < 10; j++) {
          this.tableData[i].list.push({
            id: j,
            title: 'iPhone X ' + i + ' - ' + j,
            cover:
              'https://img10.360buyimg.com/n1/s450x450_jfs/t1/99856/30/11456/249736/5e33b2d2E8d404e63/a1da190926517d79.jpg',
            create_time: '2020-02-02 12:12:12',
            cate: '手机',
            type: '普通商品',
            sale_count: 20,
            order: 100,
            status: 0,
            stock: 200,
            price: 7999,
            isPutaway: false,
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
    putaway(e) {
      this.$message({
        message: e ? '上架' : '下架',
        type: 'success',
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
    },
  },
}
</script>

<style scoped></style>
