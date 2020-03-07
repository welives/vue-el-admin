<template>
  <div>
    <el-form label-width="80px" size="small" class="w-100">
      <el-form-item label="商品大图" class="w-100">
        <div class="d-flex flex-wrap">
          <div
            v-for="(image, index) in imageList"
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
              <span class="small">图片{{ image.id }}</span>
            </div>
            <el-popconfirm
              title="是否删除该图片？"
              @onConfirm="deleteImage(index)"
            >
              <el-button
                slot="reference"
                class="p-0 position-absolute"
                size="mini"
                type="danger"
                icon="el-icon-close"
                style="top: 0; right: 0;"
                @click.stop="$emit('onConfirm')"
              ></el-button>
            </el-popconfirm>
          </div>
          <div
            v-if="imageList.length < 9"
            class="d-flex align-items-center justify-content-center border rounded"
            style="width: 150px; height: 150px;cursor: pointer;"
            @click="chooseImage(-1)"
          >
            <i class="el-icon-plus h2 text-muted"></i>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MediaSetting',
  inject: ['app'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['imageList'])
  },
  methods: {
    ...mapMutations('goods', ['changeState']),
    chooseImage(index) {
      const MAX = 9
      const count = MAX - this.imageList.length
      this.app.chooseImage(
        (res) => {
          let list = []
          if (index === -1) {
            list = [...res, ...this.imageList]
          } else {
            list = [...this.imageList]
            list[index] = res[0]
          }
          this.changeState({ key: 'imageList', value: list })
        },
        index === -1 ? count : 1
      )
    },
    deleteImage(index) {
      const list = [...this.imageList]
      list.splice(index, 1)
      this.changeState({ key: 'imageList', value: list })
    }
  }
}
</script>

<style scoped></style>
