<template>
  <div>
    <li
      class="list-group-item list-group-item-action d-flex align-items-center"
      :class="{ 'album-active': active }"
      style="cursor: pointer"
      @click.stop="chooseAlbum({ album, index })"
    >
      {{ album.name }}
      <span v-if="!showOptions" class="btn btn-light btn-sm ml-auto">
        {{ album.imagesCount }}
      </span>
      <el-dropdown v-else class="ml-auto" trigger="click">
        <span class="btn btn-light btn-sm">
          {{ album.imagesCount
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
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
    chooseAlbum(obj) {
      const { album, index } = obj
      let albumList = this.$image.albumList
      if (this.albumIndex === index) return
      this.$image.albumIndex = index
      this.$image.currentPage = 1
      this.$image.total = albumList[index].imagesCount
      // 如果所选相册的图片列表为空,则发起请求
      if (albumList[index].imageList.length === 0) {
        this.$store.dispatch('image/getImages', album.id).then((res) => {
          let { imageList } = res
          this.$image.imageList = imageList
        })
      } else {
        // 否则从vuex获取数据
        this.$image.imageList = albumList[index].imageList
      }
      this.$image.$refs.imageHeader.unChoose()
    },
    // 删除相册
    delAlbum(index) {
      this.$confirm('是否删除该相册?', {
        type: 'warning',
      })
        .then(() => {
          let albumList = this.$image.albumList
          // index不等于0且等于长度减1 或 index不等于0且不等于长度减1
          if (index === albumList.length - 1 || index !== 0) {
            this.$image.albumIndex -= 1
            albumList.splice(index, 1)
            this.getImageList()
          } else {
            albumList.splice(index, 1)
            // index等于0且数组长度大于0
            if (albumList.length > 0) {
              this.getImageList()
            } else {
              // index等于0且数组长度等于0
              this.$image.total = 0
              this.$image.imageList = []
            }
          }
          this.$store.commit('image/SET_ALBUM', albumList)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {})
    },
    getImageList() {
      let albumList = this.$image.albumList
      this.$image.total = albumList[this.$image.albumIndex].imagesCount
      if (albumList[this.$image.albumIndex].imageList.length === 0) {
        this.$store
          .dispatch('image/getImages', albumList[this.$image.albumIndex].id)
          .then((res) => {
            let { imageList } = res
            this.$image.imageList = imageList
          })
      } else {
        this.$image.imageList = albumList[this.$image.albumIndex].imageList
      }
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
