<template>
  <div>
    商品详情
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
