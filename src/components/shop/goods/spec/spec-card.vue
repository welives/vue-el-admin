<template>
  <div>
    <div class="card-header d-flex align-items-center py-2">
      <span class="text-muted">规格项:</span>
      <el-input
        v-model="card.name"
        placeholder=""
        size="mini"
        class="w-25 mx-2"
        @change="updateSpecCard({ cardIndex, key: 'name', value: $event })"
      >
        <!-- <el-button
          slot="append"
          icon="el-icon-more"
          @click="chooseSpec"
        ></el-button> -->
      </el-input>
      <el-radio-group
        v-model="card.type"
        @change="updateSpecCard({ cardIndex, key: 'type', value: $event })"
      >
        <el-radio :label="0" class="mb-0">无</el-radio>
        <el-radio :label="1" class="mb-0">颜色</el-radio>
        <el-radio :label="2" class="mb-0">图片</el-radio>
      </el-radio-group>
      <el-button-group class="ml-auto">
        <el-button
          icon="el-icon-top"
          size="mini"
          :disabled="cardIndex === 0"
          @click="sortSpecCard({ action: 'moveUp', cardIndex })"
        ></el-button>
        <el-button
          icon="el-icon-bottom"
          size="mini"
          :disabled="cardIndex === multipleSpecCard.length - 1"
          @click="sortSpecCard({ action: 'moveDown', cardIndex })"
        ></el-button>
        <el-button
          icon="el-icon-delete"
          size="mini"
          @click="delSpecCard(cardIndex)"
        ></el-button>
      </el-button-group>
    </div>
    <div class="card-body">
      <div
        class="d-flex align-items-center flex-wrap"
        style="margin-top: -10px;"
      >
        <!-- 规格属性列表 -->
        <card-value
          v-for="(item, index) in card.list"
          :key="index"
          v-dragging="{
            item: item,
            list: card.list,
            group: `card[${cardIndex}]`
          }"
          :type="card.type"
          :item="item"
          :index="index"
          :cardIndex="cardIndex"
        ></card-value>
      </div>
      <div style="margin-bottom: -15px;" class="mt-2">
        <el-button type="text" icon="el-icon-plus" @click="addSpecValue"
          >增加规格值</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import cardValue from './card-value.vue'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'SpecCard',
  // inject: ['app'],
  components: {
    cardValue
  },
  props: {
    card: Object,
    cardIndex: Number
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['multipleSpecCard'])
  },
  created() {
    this.$dragging.$on('dragend', (e) => {
      if (e.group === `card[${this.cardIndex}]`) {
        this.sortSpecCardValue({
          cardIndex: this.cardIndex,
          list: this.card.list
        })
      }
    })
  },
  methods: {
    ...mapMutations('goods', [
      'updateSpecCard',
      'sortSpecCard',
      'delSpecCard',
      'addSpecCardValue',
      'sortSpecCardValue'
    ]),
    addSpecValue() {
      this.$prompt('', '请输入规格名称', {
        inputPlaceholder: '请输入规格名称',
        inputValue: '',
        inputValidator(value) {
          if (value === '') {
            return '规格名称不能为空'
          }
        }
      })
        .then(({ value }) => {
          this.addSpecCardValue({
            cardIndex: this.cardIndex,
            name: value
          })
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
        .catch(() => {})
    }
    // chooseSpec() {
    //   this.app.chooseSpec((res) => {
    //     this.updateSpecCard({
    //       cardIndex: this.cardIndex,
    //       key: 'name',
    //       value: res.name
    //     })
    //     const list = []
    //     res.list.forEach((v) => {
    //       list.push(v.item)
    //     })
    //     this.updateSpecCard({
    //       cardIndex: this.cardIndex,
    //       key: 'list',
    //       value: list
    //     })
    //   })
    // }
  }
}
</script>

<style scoped></style>
