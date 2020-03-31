<template>
  <div>
    <el-form
      ref="securityForm"
      :model="securityForm"
      label-width="120px"
      size="small"
    >
      <el-form-item label="是否开启API安全" prop="apiGuard">
        <el-switch v-model="securityForm.apiGuard" active-color="#13ce66">
        </el-switch>
        <small class="text-muted d-block">
          api安全开启后,调用前端api需要传输签名串
        </small>
      </el-form-item>
      <el-form-item label="秘钥" prop="apiKey">
        <el-input
          v-model="securityForm.apiKey"
          placeholder=""
          class="w-50"
        ></el-input>
        <small class="text-muted d-block">
          秘钥设置关系系统中api调用传输签名串的编码规则,以及会员token解析,请慎重设置,注意设置之后对应会员要求重新登录获取新的token
        </small>
      </el-form-item>
      <el-form-item class="text-center w-50">
        <el-button type="primary" size="medium" @click="submitForm"
          >确定</el-button
        >
        <el-button size="medium" @click="resetForm('securityForm')"
          >重填
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Security',
  inject: ['$layout'],
  data() {
    return {
      securityForm: {
        apiGuard: '',
        apiKey: '',
      },
    }
  },
  created() {
    this.__init()
  },
  methods: {
    __init() {
      this.$layout.showLoading()
      this.$store.dispatch('base/getBase', 'security').then((res) => {
        this.securityForm = { ...res }
      })
      this.$layout.hideLoading()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm() {
      this.$store.commit('base/UPLOAD_data', {
        key: 'security',
        value: this.securityForm,
      })
    },
  },
}
</script>

<style scoped></style>
