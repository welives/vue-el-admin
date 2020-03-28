<template>
  <div>
    <el-dialog
      title="商品规格选择"
      :visible.sync="specModel"
      width="80vw"
      top="5vh"
      @close="hide"
    >
      <el-container
        class="position-relative"
        style="height: 70vh;margin: -30px -20px;"
      >
        <el-aside
          width="200px"
          style="top: 0; bottom: 0"
          class="bg-white border-right position-absolute border-bottom"
        >
          <ul class="list-group list-group-flush">
            <li
              v-for="(spec, index) in getCurPageData"
              :key="index"
              class="list-group-item list-group-item-action border-0"
              :class="curIndex === index ? 'spec-active' : ''"
              @click="specChange(index)"
            >
              {{ spec.name }}
            </li>
          </ul>
        </el-aside>
        <el-container
          class="position-absolute"
          style="top: 0; left: 200px; right: 0; bottom: 0"
        >
          <el-header
            height="60px"
            class="border-top border-bottom"
            style="line-height: 60px;"
          >
            <el-button type="primary" size="small" @click="chooseAll">{{
              isChooseAll ? '取消全选' : '全选'
            }}</el-button>
          </el-header>
          <el-main>
            <div class="d-flex flex-wrap">
              <span
                v-for="(item, index) in curSpecValue"
                :key="index"
                class="border rounded py-1 px-2 m-2"
                style="cursor: pointer;"
                :class="item.isCheck ? 'spec-active' : ''"
                @click="chooseValue({ item, index })"
                >{{ item.name }}</span
              >
            </div>
          </el-main>
        </el-container>
      </el-container>
      <div slot="footer" class="position-relative d-flex align-items-center">
        <el-aside
          width="200px"
          class="position-absolute border-right spec-pagination"
        >
          <el-pagination
            layout="prev, next"
            :page-size="page.size"
            :total="page.total"
            class="p-0 d-flex align-items-center justify-content-center"
            @current-change="curPageChange"
          >
          </el-pagination>
        </el-aside>
        <div class="ml-auto">
          <el-button @click="specModel = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ChooseSpec',
  data() {
    return {
      specModel: false,
      callback: false,
      curIndex: 0,
      chooseList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
    }
  },
  computed: {
    ...mapState({
      specList: (state) => state.spec.specList,
    }),
    // 当前规格项的规则值
    curSpecValue() {
      if (this.specList.length === 0) {
        return []
      }
      const curSpec = this.getCurPageData[this.curIndex]
      const index = this.specList.findIndex((v) => v.id === curSpec.id)
      return this.specList[index].value
    },
    isChooseAll() {
      if (this.curSpecValue.length === 0) {
        return false
      }
      return this.curSpecValue.length === this.chooseList.length
    },
    // 规格项分页
    getCurPageData() {
      const curData = []
      const totalPage = Math.ceil(this.specList.length / this.page.size)
      for (let i = 0; i < totalPage; i++) {
        curData[i] = this.specList.slice(
          this.page.size * i,
          this.page.size * (i + 1),
        )
      }
      return curData[this.page.current - 1]
    },
  },
  methods: {
    // 获取规格
    getSpecList() {
      this.$store.dispatch('spec/getSpecList').then((res) => {
        this.page.total = res.length
      })
    },
    showDialog(callback) {
      this.getSpecList()
      this.callback = callback
      this.specModel = true
    },
    hide() {
      this.unChoose()
      this.curIndex = 0
      this.callback = false
      this.specModel = false
    },
    confirm() {
      if (typeof this.callback === 'function') {
        const spec = this.getCurPageData[this.curIndex]
        this.chooseList = this.chooseList.map((v) => {
          return { ...v.item }
        })
        this.callback({
          id: spec.id,
          name: spec.name,
          type: spec.type,
          value: this.chooseList,
        })
      }
      this.hide()
    },
    // 切换规格项
    specChange(index) {
      if (this.curIndex === index) return
      this.unChoose()
      this.curIndex = index
    },
    chooseValue(obj) {
      const { item, index } = obj
      // 之前没选中
      if (!item.isCheck) {
        item.isCheck = true
        return this.chooseList.push({ index, item })
      }
      // 之前是选中的
      const i = this.chooseList.findIndex((v) => v.index === index)
      if (i !== -1) {
        item.isCheck = false
        this.chooseList.splice(i, 1)
      }
    },
    chooseAll() {
      // 处于全选的状态时进行反选操作
      if (this.isChooseAll) {
        return this.unChoose()
      }
      // 未处于全选状态时进行全选操作
      this.chooseList = this.curSpecValue.map((v, index) => {
        v.isCheck = true
        return { index, item: v }
      })
    },
    unChoose() {
      this.curSpecValue.some((v) => {
        if (v.isCheck) {
          v.isCheck = !v.isCheck
        }
      })
      this.chooseList = []
    },
    // 改变页数
    curPageChange(val) {
      this.unChoose()
      this.curIndex = 0
      this.page.current = val
    },
  },
}
</script>

<style lang="scss">
.spec-active {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
.spec-pagination {
  top: 0;
  height: 70px;
  margin: -10px 0 -20px -20px;
  .el-pagination {
    height: 100%;
    .btn-prev {
      padding-right: 20px;
      .el-icon {
        font-size: 20px;
      }
    }
    .btn-next {
      padding-left: 20px;
      .el-icon {
        font-size: 20px;
      }
    }
  }
}
</style>
