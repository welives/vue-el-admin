<template>
  <div style="margin: 0 -20px">
    <router-link
      :to="{ name: 'shop_goods' }"
      style="position: absolute;top: 11px;left: 170px;"
    >
      <el-button size="small">回到商品列表页</el-button>
    </router-link>
    <tinymce ref="editor" v-model="content" :toolbar="toolbar"></tinymce>
    <el-footer
      class="d-flex align-items-center fixed-bottom"
      style="left: 200px;"
    >
      <div class="text-center flex-fill">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="clear">清空</el-button>
      </div>
    </el-footer>
  </div>
</template>

<script>
import tinymce from '@/components/common/tinymce'
export default {
  name: 'goodsContent',
  components: {
    tinymce,
  },
  data() {
    return {
      content: '',
      id: 0,
      toolbar:
        'undo redo | formatselect | fontselect fontsizeselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | lists table imageUpload | removeformat',
    }
  },
  created() {
    this.id = this.$route.params.id
    if (!this.id) {
      this.$message({
        type: 'error',
        message: '非法参数',
      })
      return this.$router.push({ name: 'shop_goods' })
    }
    this.$store.dispatch('goods/getGoods', this.id).then((res) => {
      this.content = res.goodsContent
    })
  },
  methods: {
    // 清空内容
    clear() {
      this.$refs.editor.clear()
    },
    submit() {
      this.$store.commit('goods/UPDATE_content', {
        id: this.id,
        value: this.content,
      })
      this.$message({
        type: 'success',
        message: '修改成功',
      })
      this.$router.push({ name: 'shop_goods' })
    },
  },
}
</script>

<style scoped></style>
