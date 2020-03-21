<template>
  <div>
    <li
      class="list-group-item list-group-item-action d-flex align-items-center"
      :class="{ 'album-active': active }"
      style="cursor: pointer"
      @click.stop="chooseAlbum(index)"
    >
      <el-badge :value="album.imagesCount" class="p-1" type="primary">
        <span>{{ album.name }}</span>
      </el-badge>
      <span v-if="!showOptions" class="btn btn-light btn-sm ml-auto">
        {{ album.imagesCount }}
      </span>
      <el-dropdown v-else class="ml-auto" trigger="click" placement="bottom">
        <button class="btn btn-link text-body">
          <i class="el-icon-arrow-down"></i>
        </button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.stop.native="$emit('update', { album, index })"
            >修改</el-dropdown-item
          >
          <el-dropdown-item @click.stop.native="delAlbum(index)"
            >删除</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </div>
</template>

<script>
export default {
  name: 'AlbumItem',
  inject: ['$image'],
  props: {
    album: Object,
    index: Number,
    active: { type: Boolean, default: false },
    showOptions: { type: Boolean, default: true },
  },
  methods: {
    // 选择相册
    chooseAlbum(index) {
      const image = this.$image
      if (image.albumIndex === index) return
      image.albumIndex = index
      image.currentPage = 1
      image.getImageList()
      image.$refs.imageHeader.unChoose()
    },
    // 删除相册
    delAlbum(index) {
      const image = this.$image
      this.$confirm('是否删除该相册?', {
        type: 'warning',
      })
        .then(() => {
          const id = image.getCurPageAlbum[index].id
          const delIndex = image.albumList.findIndex((v) => v.id === id)
          if (delIndex === -1) return
          // index不等于0
          if (index !== 0) {
            image.albumIndex -= 1
            this.$store.commit('image/DELETE_albumList', delIndex)
            image.getImageList()
          } else {
            // index等于0且数组长度大于1
            if (image.getCurPageAlbum.length > 1) {
              this.$store.commit('image/DELETE_albumList', delIndex)
              image.getImageList()
            } else if (image.getCurPageAlbum.length === 1) {
              // index等于0且数组长度等于1
              this.$store.commit('image/DELETE_albumList', delIndex)
              image.total = 0
              image.imageList = []
            }
          }
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          image.currentPage = 1
          if (!image.getCurPageAlbum && image.albumPage > 1) {
            image.changeAlbum('prev')
          }
        })
        .catch(() => {})
    },
  },
}
</script>

<style scoped>
.album-active {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
</style>
