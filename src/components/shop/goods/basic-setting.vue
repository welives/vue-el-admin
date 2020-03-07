<template>
  <div>
    <el-form
      ref="basicForm"
      :model="basicForm"
      label-width="80px"
      size="small"
      class="w-75"
    >
      <el-form-item label="商品名称" class="w-75" prop="name">
        <el-input
          v-model="basicForm.name"
          placeholder="请输入商品名称,不能超过60个字符"
          autofocus
          @change="basicFormModel({ key: 'name', value: $event })"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="cateVal">
        <el-cascader
          v-model="basicForm.cateVal"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="basicFormModel({ key: 'cateVal', value: $event })"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="商品描述" class="w-50" prop="desc">
        <el-input
          v-model="basicForm.desc"
          type="textarea"
          :row="5"
          placeholder="选填,商品卖点描述"
          @change="basicFormModel({ key: 'desc', value: $event })"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="商品单位" class="w-50" prop="unit">
        <el-input
          v-model="basicForm.unit"
          placeholder="请输入商品单位"
          @change="basicFormModel({ key: 'unit', value: $event })"
        ></el-input>
      </el-form-item>
      <el-form-item label="总库存" class="w-50" prop="stock">
        <el-input
          v-model="basicForm.stock"
          type="number"
          min="0"
          @change="basicFormModel({ key: 'stock', value: $event })"
        >
          <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="库存预警" class="w-50" prop="min_stock">
        <el-input
          v-model="basicForm.min_stock"
          type="number"
          min="0"
          @change="basicFormModel({ key: 'min_stock', value: $event })"
        >
          <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="库存显示" prop="display_stock">
        <el-radio-group
          v-model="basicForm.display_stock"
          @change="basicFormModel({ key: 'display_stock', value: $event })"
        >
          <el-radio-button :label="1">显示</el-radio-button>
          <el-radio-button :label="0">隐藏</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否上架" prop="status">
        <el-radio-group
          v-model="basicForm.status"
          @change="basicFormModel({ key: 'status', value: $event })"
        >
          <el-radio-button :label="1">立即上架</el-radio-button>
          <el-radio-button :label="0">放入仓库</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="运费模板" prop="express">
        <el-select
          v-model="basicForm.express"
          placeholder="请选择运费模板"
          @change="basicFormModel({ key: 'express', value: $event })"
        >
          <el-option label="选项一" value="1"></el-option>
          <el-option label="选项二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="text-center">
        <el-button type="primary" size="medium">提交</el-button>
        <el-button size="medium" @click="resetForm('basicForm')"
          >重填</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'BasicSetting',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['options', 'basicForm'])
  },
  mounted() {},
  methods: {
    ...mapMutations('goods', ['basicFormModel']),
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped></style>
