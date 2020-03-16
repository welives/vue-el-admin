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
            @click="$emit('choose', { image, index })"
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
                @click="$emit('view', image)"
              ></el-button>
              <el-button
                class="p-2"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="$emit('update', image)"
              ></el-button>
              <el-popconfirm
                title="是否删除该图片？"
                @onConfirm="$emit('del', index)"
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
  props: {
    image: Object,
    index: Number,
  },
}
</script>

<style scoped></style>
