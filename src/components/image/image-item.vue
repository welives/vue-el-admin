<template>
  <div>
    <el-col :span="24" :xl="3" :lg="4" :md="6" :sm="8" :xs="24">
      <el-card
        :body-style="{ padding: '0' }"
        class="mb-2 position-relative"
        shadow="hover"
      >
        <div class="border" :class="{ 'border-success': image.isCheck }">
          <span
            v-if="image.isCheck"
            class="badge badge-success position-absolute"
            style="right: 0;top: 0"
          >
            <i class="el-icon-check"></i>
          </span>
          <img
            :src="image.url"
            class="w-100"
            style="height: 100px;cursor: pointer;"
            @click="chooseImage(image)"
          />
          <div
            style="background-color: rgba(0,0,0,.5);margin-top: -25px;"
            class="w-100 text-white position-absolute px-1"
          >
            <span class="small">{{ image.name }}</span>
          </div>
          <div class="p-1 text-center">
            <el-button-group>
              <el-button
                class="p-2"
                size="mini"
                icon="el-icon-view"
                type="success"
                @click="$image.$emit('view', image)"
              ></el-button>
              <el-button
                class="p-2"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="updateImage(image)"
              ></el-button>
              <el-popconfirm
                title="是否删除该图片？"
                @onConfirm="delImage(index)"
              >
                <el-button
                  slot="reference"
                  class="p-2"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                ></el-button>
              </el-popconfirm>
            </el-button-group>
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'ImageItem',
  inject: ['$image'],
  props: {
    image: Object,
    index: Number,
  },
  methods: {
    // 图片编辑
    updateImage(image) {
      this.$prompt('', '请输入图片名称', {
        inputPlaceholder: '请输入图片名称',
        inputValue: image.name,
        inputValidator(value) {
          if (value === '') {
            return '图片名称不能为空'
          }
        },
      })
        .then(({ value }) => {
          image.name = value
          this.$message({
            message: '修改成功',
            type: 'success',
          })
        })
        .catch(() => {})
    },
    // 选择图片
    chooseImage(image) {
      if (!image.isCheck) {
        this.$image.chooseList.push({ ...image })
        image.isCheck = true
        return
      }
      const i = this.$image.chooseList.findIndex((v) => v.id === image.id)
      if (i === -1) return
      image.isCheck = false
      this.$image.chooseList.splice(i, 1)
    },
    // 删除单张图片
    delImage(index) {
      this.$image.imageList.splice(index, 1)
      this.$image.albumList[
        this.$image.albumIndex
      ].imageList = this.$image.imageList
      this.$image.albumList[
        this.$image.albumIndex
      ].imagesCount = this.$image.imageList.length
      this.$image.total = this.$image.imageList.length
      this.$store.commit('image/SET_ALBUM', this.$image.albumList)
    },
  },
}
</script>

<style scoped></style>
