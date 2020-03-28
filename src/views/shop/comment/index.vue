<template>
  <div class="bg-white px-3 mt-2" style="margin: 0 -20px 40px;">
    <button-search ref="buttonSearch" :showSearch="true">
      <template #right>
        <el-input
          v-model="form.username"
          size="mini"
          class="w-25"
          placeholder="请输入要搜索的用户名"
        ></el-input>
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="mx-2"
          size="mini"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
        <!-- <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
        <el-button size="mini" @click="advancedSearch"
          >高级搜索<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button> -->
      </template>
      <!-- <template #form>
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
      </template> -->
    </button-search>
    <!-- 表格数据 -->
    <el-table :data="getCurPageData" border class="mt-2">
      <el-table-column type="expand" #default="scope">
        <div class="media">
          <img
            style="height: 48px; width: 48px;"
            class="mr-3 rounded-circle"
            :src="scope.row.avatar"
          />
          <div class="media-body">
            <div class="d-flex align-items-center">
              <small class="text-danger mr-2">{{ scope.row.username }}</small>
              <small class="text-muted"
                >发表于<span class="ml-2">{{
                  scope.row.commentTime
                }}</span></small
              >
              <el-button
                v-if="replyIndex === -1"
                type="info"
                size="mini"
                class="ml-auto"
                @click="reply(scope)"
                >{{ scope.row.reply ? '修改' : '回复' }}</el-button
              >
            </div>
            <p class="w-75">{{ scope.row.content }}</p>
            <!-- 回复开始 -->
            <div class="media" v-if="scope.row.reply || replyIndex > -1">
              <img
                class="mr-3 rounded-circle"
                style="height: 48px; width: 48px;"
                :src="$store.state.user.user.avatar"
              />
              <div class="media-body">
                <div class="d-flex align-items-center">
                  <small class="text-danger mr-2">{{
                    $store.state.user.user.username
                  }}</small>
                  <small class="text-muted" v-if="scope.row.replyTime"
                    >回复于<span class="ml-2">{{
                      scope.row.replyTime
                    }}</span></small
                  >
                </div>
                <div v-if="replyIndex > -1" class="w-75">
                  <el-input
                    type="textarea"
                    v-model="replyContent"
                    placeholder="请输入回复内容"
                    rows="3"
                  ></el-input>
                  <div class="mt-2 text-center">
                    <el-button
                      type="success"
                      size="mini"
                      :disabled="replyContent === ''"
                      @click="replySubmit"
                      >提交</el-button
                    >
                    <el-button type="info" size="mini" @click="replyCancel"
                      >取消</el-button
                    >
                  </div>
                </div>
                <p v-else class="w-75">{{ scope.row.reply }}</p>
              </div>
            </div>
            <!-- 回复结束 -->
          </div>
        </div>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="60" align="center">
      </el-table-column>
      <el-table-column
        #default="scope"
        label="商品"
        min-width="350"
        header-align="center"
      >
        <div class="media d-flex align-items-center justify-content-center">
          <img
            class="mr-3"
            :src="scope.row.cover"
            @click="preView(scope.row.cover)"
            style="width: 60px; cursor: pointer;"
          />
          <div class="media-body">
            <p class="mb-0 font-weight-bold text-primary">
              {{ scope.row.title }}
            </p>
          </div>
        </div>
      </el-table-column>
      <el-table-column
        #default="scope"
        label="评价信息"
        header-align="center"
        min-width="250"
      >
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
      <el-table-column
        label="评价时间"
        prop="commentTime"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        #default="scope"
        label="是否显示"
        align="center"
        width="100"
      >
        <el-switch
          v-model="scope.row.status"
          active-color="#13ce66"
          @change="statusChange('comment/UPDATE_status', scope)"
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
    <!-- 图片预览 -->
    <el-dialog
      :visible.sync="previewModel"
      @close="closePreviewModel"
      width="70vw"
      top="5vh"
      :show-close="false"
      :destroy-on-close="true"
    >
      <div style="margin: -60px -20px -30px">
        <img :src="previewUrl" class="w-100" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'
import common from '@/common/mixins/common.js'
import { Random } from 'mockjs'
import { mapState } from 'vuex'
export default {
  name: 'Comment',
  inject: ['$layout'],
  mixins: [common],
  components: {
    buttonSearch,
  },
  data() {
    return {
      form: {
        username: '',
        time: [],
      },
      replyIndex: -1,
      replyContent: '',
      previewModel: false,
      previewUrl: '',
      searchList: [],
    }
  },
  watch: {
    'form.username'(e) {
      this.getCurPageData = this.form
    },
    'form.time'(e) {
      if (!e) {
        this.form.time = []
      }
      this.getCurPageData = this.form
    },
  },
  computed: {
    ...mapState({
      dataList: (state) => state.comment.commentList,
    }),
    getCurPageData: {
      get() {
        const curData = []
        const dataList =
          this.searchList.length || this.form.username || this.form.time.length
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
        let { username, time } = value
        username = username.trim()
        if (username) {
          searchList = searchList.filter((v) => {
            if (v.username.indexOf(username) !== -1) {
              return v
            }
          })
        }
        if (time.length) {
          const from = new Date(time[0]).getTime()
          const to = new Date(time[1]).getTime()
          searchList = searchList.filter((v) => {
            const target = new Date(v.commentTime).getTime()
            if (target >= from && target <= to) {
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
  created() {
    this.__init()
  },
  methods: {
    // 初始化数据
    __init() {
      this.$layout.showLoading()
      this.$store.dispatch('comment/getComment').then((res) => {
        this.page.total = res.length
      })
      this.$layout.hideLoading()
    },
    // searchEvent(e) {
    //   console.log(e)
    // },
    // advancedSearch() {
    //   this.$refs.buttonSearch.advancedSearch = true
    // },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // },
    preView(url) {
      this.previewUrl = url
      this.previewModel = true
    },
    closePreviewModel() {
      this.previewUrl = ''
      this.previewModel = false
    },
    reply(data) {
      const index = this.dataList.findIndex((v) => v.id === data.row.id)
      this.replyIndex = index
      this.replyContent = data.row.reply
    },
    replySubmit() {
      if (this.replyContent !== '') {
        this.$store.commit('comment/SET_reply', {
          index: this.replyIndex,
          value: this.replyContent,
          time: Random.datetime(),
        })
      }
      this.replyCancel()
    },
    replyCancel() {
      this.replyIndex = -1
      this.replyContent = ''
    },
  },
}
</script>

<style scoped></style>
