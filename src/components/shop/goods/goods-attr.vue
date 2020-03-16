<template>
  <div>
    <el-form label-width="80px" size="small" class="w-100">
      <el-form-item label="商品类型" class="w-50">
        <el-select
          :value="goodsType"
          placeholder=""
          @change="changeState({ key: 'goodsType', value: $event })"
        >
          <el-option label="类型一" value="1"></el-option>
          <el-option label="类型二" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-card>
      <div slot="header">
        <span>商品属性</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="手机型号" class="w-50">
          <el-input
            v-model="goodsAttrs.phoneModel"
            placeholder="请输入手机型号"
            @input="updateGoodsAttrs({ key: 'phoneModel', value: $event })"
          ></el-input>
        </el-form-item>
        <el-form-item class="text-center w-50">
          <el-button type="primary" size="medium">提交</el-button>
          <el-button size="medium">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'GoodsAttr',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['goodsType', 'goodsAttrs']),
  },
  methods: {
    ...mapMutations('goods', ['changeState', 'updateGoodsAttrs']),
  },
}
</script>

<style scoped></style>
