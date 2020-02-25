<template>
  <div
    class="border px-1 mr-2 rounded position-relative d-flex align-items-center"
  >
    <div v-if="type !== 0" class="d-flex align-items-center">
      <!-- 颜色选择 -->
      <el-color-picker
        v-if="type === 1"
        v-model="item.color"
        size="mini"
        class="mr-1"
        @change="
          updateSpecCardValue({
            cardIndex,
            index,
            key: 'name',
            value: $event
          })
        "
      ></el-color-picker>
      <!-- 图片选择 -->
      <template v-else>
        <el-button
          v-if="!item.image"
          icon="el-icon-plus"
          circle
          size="mini"
          class="mr-1"
          @click="chooseImage(cardIndex, index)"
        ></el-button>
        <img
          v-else
          :src="item.image"
          style="width: 40px; cursor: pointer;"
          class="rounded mr-1"
          @click="chooseImage(cardIndex, index)"
        />
      </template>
    </div>
    <input
      v-model="item.name"
      type="text"
      class="form-control text-center border-0 px-0"
      style="width: 80px;font-size: 14px"
      @change="
        updateSpecCardValue({
          cardIndex,
          index,
          key: 'name',
          value: $event.target.value
        })
      "
    />
    <span
      class="btn btn-light p-0 position-absolute"
      style="line-height: 1;right: -9px;top: -9px;"
      @click="delSpecCardValue({ cardIndex, index })"
      ><i class="el-icon-circle-close"></i
    ></span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'CardValue',
  inject: ['app'],
  props: {
    item: Object,
    index: Number,
    cardIndex: Number,
    type: { type: Number, default: 0 }
  },
  data() {
    return {
      specValue: this.item
    }
  },
  watch: {
    item(newValue) {
      this.item = newValue
    }
  },
  methods: {
    ...mapMutations('goods', ['delSpecCardValue', 'updateSpecCardValue']),
    chooseImage(cardIndex, index) {
      this.app.chooseImage((res) => {
        this.updateSpecCardValue({
          cardIndex,
          index,
          key: 'image',
          value: res[0].url
        })
      }, 1)
    }
  }
}
</script>

<style scoped></style>
