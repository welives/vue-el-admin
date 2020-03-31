<template>
  <div>
    <el-form
      ref="accessForm"
      :model="accessForm"
      label-width="120px"
      size="small"
      class="w-50"
    >
      <el-form-item label="是否允许注册" prop="isReg">
        <el-switch v-model="accessForm.isReg" active-color="#13ce66">
        </el-switch>
      </el-form-item>
      <el-form-item label="注册类型" prop="regType">
        <el-radio-group v-model="accessForm.regType">
          <el-radio-button label="normal">普通注册</el-radio-button>
          <el-radio-button label="email">邮箱注册</el-radio-button>
          <el-radio-button label="phone">手机注册</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码最小长度" prop="passLen" class="w-50">
        <el-input
          v-model="accessForm.passLen"
          type="number"
          :min="0"
          :max="32"
        ></el-input>
      </el-form-item>
      <el-form-item label="强制密码复杂度" prop="isRegistry">
        <el-checkbox-group v-model="accessForm.passEncrypt">
          <el-checkbox-button label="number">数字</el-checkbox-button>
          <el-checkbox-button label="lower">小写字母</el-checkbox-button>
          <el-checkbox-button label="upper">大写字母</el-checkbox-button>
          <el-checkbox-button label="symbol">符号</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item class="text-center">
        <el-button type="primary" size="medium" @click="submitForm"
          >确定</el-button
        >
        <el-button size="medium" @click="resetForm('accessForm')"
          >重填</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Access',
  inject: ['$layout'],
  data() {
    return {
      accessForm: {
        isReg: '',
        regType: '',
        passLen: '',
        passEncrypt: '',
      },
    }
  },
  created() {
    this.__init()
  },
  methods: {
    __init() {
      this.$layout.showLoading()
      this.$store.dispatch('base/getBase', 'access').then((res) => {
        this.accessForm = { ...res }
      })
      this.$layout.hideLoading()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm() {
      this.$store.commit('base/UPLOAD_data', {
        key: 'access',
        value: this.accessForm,
      })
    },
  },
}
</script>

<style scoped></style>
