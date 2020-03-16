<template>
  <div>
    <div class="d-flex align-items-center">
      <slot name="left"></slot>
      <div v-show="!advancedSearch" v-if="showSearch" class="ml-auto">
        <slot name="right">
          <el-input
            v-model="keyword"
            :placeholder="placeholder"
            size="mini"
            class="mr-2"
            style="width: 200px;"
          ></el-input>
          <el-button type="info" size="mini" @click="$emit('search', keyword)"
            >搜索</el-button
          >
          <el-button size="mini" @click="advancedSearch = true"
            >高级搜索<i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
        </slot>
      </div>
    </div>
    <el-card v-if="advancedSearch" class="bg-light my-2">
      <div slot="header" style="margin: -10px;">
        <span>高级搜索</span>
        <el-button
          type="text"
          class="float-right py-1"
          @click="advancedSearch = false"
          >收起<i class="el-icon-arrow-up el-icon--right"></i
        ></el-button>
      </div>
      <slot name="form"></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ButtonSearch',
  props: {
    placeholder: { type: String, default: '' },
    showSearch: { type: Boolean, default: true },
  },
  data() {
    return {
      keyword: '',
      advancedSearch: false,
    }
  },
}
</script>

<style scoped></style>
