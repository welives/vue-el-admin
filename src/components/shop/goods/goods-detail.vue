<template>
  <div class="px-3" style="margin: 0 -20px 40px;">
    <router-link
      :to="{ name: 'shop_goods' }"
      style="position: absolute;top: 11px;left: 170px;"
    >
      <el-button size="small">回到商品列表页</el-button>
    </router-link>
    <tinymce ref="editor" v-model="msg" @onClick="onClick"></tinymce>
  </div>
</template>

<script>
import tinymce from '@/components/common/tinymce'
export default {
  name: 'GoodsDetail',
  components: {
    tinymce,
  },
  data() {
    return {
      msg: 'Welcome to Use Tinymce Editor',
    }
  },
  methods: {
    // 鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    // 清空内容
    clear() {
      this.$refs.editor.clear()
    },
  },
}
</script>

<style scoped></style>
