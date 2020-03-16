<template>
  <div>
    <li
      class="list-group-item list-group-item-action d-flex align-items-center"
      :class="{ 'album-active': active }"
      style="cursor: pointer"
      @click.stop="$emit('choose', index)"
    >
      {{ album.name }}
      <span v-if="!showOptions" class="btn btn-light btn-sm ml-auto">
        {{ album.num }}
      </span>
      <el-dropdown v-else class="ml-auto" trigger="click">
        <span class="btn btn-light btn-sm">
          {{ album.num }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.stop.native="$emit('update', { album, index })"
            >修改</el-dropdown-item
          >
          <el-dropdown-item @click.stop.native="$emit('del', index)"
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
  props: {
    album: Object,
    index: Number,
    active: { type: Boolean, default: false },
    showOptions: { type: Boolean, default: true },
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
