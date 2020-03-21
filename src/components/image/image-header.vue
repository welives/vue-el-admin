<template>
  <div>
    <el-header class="d-flex align-items-center border-bottom">
      <div class="d-flex mr-auto flex-fill">
        <el-select
          v-model="sort"
          placeholder="请选择图片排序方式"
          size="small"
          @change="imageSort"
        >
          <el-option label="升序" value="asc"></el-option>
          <el-option label="降序" value="desc"></el-option>
        </el-select>
        <el-input
          v-model="$image.keyword"
          placeholder="请输入要搜索的图片名(不区分大小写)"
          size="small"
          class="mx-2 w-50"
        ></el-input>
      </div>
      <el-button type="success" size="small" @click="$emit('create', false)"
        >创建相册</el-button
      >
      <el-button type="primary" size="small" @click="uploadModel = true"
        >上传图片 <i class="el-icon-upload"></i
      ></el-button>
      <el-button
        v-if="chooseList.length"
        type="warning"
        size="small"
        @click="unChoose"
        >取消选中</el-button
      >
      <el-button
        v-if="chooseList.length"
        type="danger"
        size="small"
        @click="delImages"
        >批量删除</el-button
      >
    </el-header>
    <!-- 上传图片 -->
    <el-dialog
      title="上传图片"
      :visible.sync="uploadModel"
      :destroy-on-close="true"
    >
      <div class="text-center">
        <el-upload
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </el-dialog>
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
export default {
  name: 'ImageHeader',
  inject: ['$image'],
  props: {
    chooseList: Array,
  },
  data() {
    return {
      sort: 'asc',
      uploadModel: false,
      previewModel: false,
      previewUrl: '',
    }
  },
  mounted() {
    // 图片预览
    this.$image.$on('view', (image) => {
      this.previewUrl = image.url
      this.previewModel = true
    })
  },
  methods: {
    // 批量删除图片
    delImages() {
      let image = this.$image
      this.$confirm('是否删除选中的图片?', {
        type: 'warning',
      })
        .then(() => {
          const list = image.imageList.filter((img) => {
            return !image.chooseList.some((c) => c.id === img.id)
          })
          this.$store.commit('image/DELETE_images', {
            albumIdx: image.albumIndex,
            list,
          })

          if (image.searchList.length > 0) {
            const remain = image.searchList.filter((s) => {
              return !image.chooseList.some((c) => s.id === c.id)
            })
            image.searchList = remain
            if (image.searchList.length !== 0) {
              image.total = image.searchList.length
            } else {
              image.total = list.length
              image.keyword = ''
            }
          } else {
            image.total = list.length
          }

          image.imageList = list
          image.chooseList = []
          if (!image.getCurPageImage) {
            const totalPage = Math.ceil(image.imageList.length / image.pageSize)
            if (totalPage < image.currentPage) {
              image.currentPage--
            }
          }
        })
        .catch(() => {})
    },
    unChoose() {
      this.$image.imageList.forEach((img) => (img.isCheck = false))
      this.$image.chooseList = []
    },
    closePreviewModel() {
      this.previewUrl = ''
      this.previewModel = false
    },
    imageSort(sort) {
      this.$store.commit('image/SET_sort', sort)
      this.$store.commit('image/SORT_imageList')
    },
  },
}
</script>

<style scoped></style>
