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
          class="bg-white border-right position-absolute"
        >
          <ul class="list-group list-group-flush">
            <li
              v-for="(spec, index) in specList"
              :key="index"
              class="list-group-item list-group-item-action border-0"
              :class="specIndex === index ? 'spec-active' : ''"
              @click="changeSpecCard(index)"
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
                v-for="(item, index) in specValues"
                :key="index"
                class="border rounded py-1 px-2 m-2"
                style="cursor: pointer;"
                :class="item.isCheck ? 'spec-active' : ''"
                @click="chooseSpecValue({ item, index })"
                >{{ item.name }}</span
              >
            </div>
          </el-main>
        </el-container>
      </el-container>
      <span slot="footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SpecDialog',
  data() {
    return {
      specModel: false,
      callback: false,
      specIndex: 0,
      chooseList: [],
      specList: []
    }
  },
  computed: {
    ...mapGetters(['multipleSpecCard']),
    specValues() {
      if (this.specList.length === 0) {
        return []
      }
      return this.specList[this.specIndex].list
    },
    isChooseAll() {
      if (this.specValues.length === 0) {
        return false
      }
      return this.specValues.length === this.chooseList.length
    }
  },
  created() {
    this.specList = this.multipleSpecCard
  },
  methods: {
    showDialog(callback) {
      this.callback = callback
      this.specValues.filter((v, index) => {
        if (v.isCheck) {
          this.chooseList.push({ index, item: v })
        }
      })
      this.specModel = true
    },
    hide() {
      this.unChoose()
      this.specModel = false
      this.specIndex = 0
      this.callback = false
    },
    confirm() {
      if (typeof this.callback === 'function') {
        const item = this.specList[this.specIndex]
        this.callback({
          name: item.name,
          type: item.type,
          list: this.chooseList
        })
      }
      this.hide()
    },
    changeSpecCard(index) {
      if (this.specIndex === index) return
      this.unChoose()
      this.specIndex = index
      this.specValues.filter((v, index) => {
        if (v.isCheck) {
          this.chooseList.push({ index, item: v })
        }
      })
    },
    chooseSpecValue(obj) {
      const { item, index } = obj
      // 之前没选中
      if (!item.isCheck) {
        item.isCheck = true
        return this.chooseList.push({ index, item: item })
      }
      // 之前是选中的
      const i = this.chooseList.findIndex((v) => v.index === index)
      if (i === -1) return
      item.isCheck = false
      this.chooseList.splice(i, 1)
    },
    chooseAll() {
      if (this.isChooseAll) {
        this.specValues.forEach((v) => (v.isCheck = false))
        return this.unChoose()
      }
      this.chooseList = this.specValues.map((v, index) => {
        v.isCheck = true
        return { index, item: v }
      })
    },
    unChoose() {
      this.chooseList = []
    }
  }
}
</script>

<style scoped>
.spec-active {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
</style>
