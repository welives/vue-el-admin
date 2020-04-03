<template>
  <div class="mt-3">
    <router-link
      :to="{ name: 'shop_goods' }"
      style="position: absolute;top: 11px;left: 170px;"
    >
      <el-button size="small">回到商品列表页</el-button>
    </router-link>
    <el-form size="small" class="w-100">
      <el-form-item label="">
        <div class="d-flex flex-wrap">
          <div
            v-for="(image, index) in banners"
            :key="index"
            class="d-flex align-items-center justify-content-center border rounded mr-3 mb-3 position-relative"
            style="width: 150px; height: 150px; cursor: pointer;"
            @click="chooseImage(index)"
          >
            <img
              v-if="image.url"
              :src="image.url"
              class="w-100"
              style="height: 100%;"
            />
            <i v-else class="el-icon-plus h2 text-muted"></i>
            <div
              style="background-color: rgba(0,0,0,.5); left: 0; bottom: 0;"
              class="w-100 text-white position-absolute px-1"
            >
              <span class="small">{{ image.name }}</span>
            </div>
            <el-popconfirm
              title="是否删除该图片？"
              @onConfirm="deleteImage(index)"
            >
              <el-button
                slot="reference"
                class="p-1 position-absolute text-white"
                size="mini"
                type="text"
                icon="el-icon-delete"
                style="top: 0; right: 0; background-color: rgba(0,0,0,.3);"
                @click.stop="$emit('onConfirm')"
                plain
              ></el-button>
            </el-popconfirm>
          </div>
          <div
            v-if="banners.length < 9"
            class="d-flex align-items-center justify-content-center border rounded"
            style="width: 150px; height: 150px;cursor: pointer;"
            @click="chooseImage(-1)"
          >
            <i class="el-icon-plus h2 text-muted"></i>
          </div>
        </div>
      </el-form-item>
    </el-form>
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
export default {
  name: 'goodsBanner',
  inject: ['$app'],
  data() {
    return {
      id: 0,
      banners: [],
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
      this.banners = res.goodsBanner
    })
  },
  methods: {
    chooseImage(index) {
      const MAX = 9
      const count = MAX - this.banners.length
      this.$app.chooseImage(
        (res) => {
          let list = []
          if (index === -1) {
            list = [...this.banners, ...res]
          } else {
            list = [...this.banners]
            list[index] = res[0]
          }
          this.banners = list
        },
        index === -1 ? count : 1,
      )
    },
    deleteImage(index) {
      this.banners.splice(index, 1)
    },
    clear() {
      this.banners = []
    },
    submit() {
      this.$store.commit('goods/UPDATE_banner', {
        id: this.id,
        value: this.banners,
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
