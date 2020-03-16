<template>
  <div>
    <el-form
      ref="uploadForm"
      :model="uploadForm"
      label-width="120px"
      size="small"
      class="w-50"
    >
      <el-form-item label="默认上传方式" prop="uploadType">
        <el-radio-group v-model="uploadForm.uploadType">
          <el-radio-button label="local">本地存储</el-radio-button>
          <el-radio-button label="qiniu">七牛云</el-radio-button>
          <el-radio-button label="aliyun">阿里云</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <template v-if="uploadForm.uploadType !== 'local'">
        <el-form-item label="Bucket" prop="bucket">
          <el-input v-model="uploadForm.bucket" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="ACCESS_KEY" prop="accessKey">
          <el-input v-model="uploadForm.accessKey" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="SECRET_KEY" prop="secretKey">
          <el-input v-model="uploadForm.secretKey" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="空间域名" prop="domain">
          <el-input v-model="uploadForm.domain" placeholder=""></el-input>
          <small class="d-block text-muted">请补全http:// 或 https://</small>
        </el-form-item>
      </template>
      <el-form-item class="text-center">
        <el-button type="primary" size="medium">确定</el-button>
        <el-button
          v-if="uploadForm.uploadType !== 'local'"
          size="medium"
          @click="resetForm('uploadForm')"
          >重填</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data() {
    return {
      uploadForm: {
        uploadType: 'local',
        bucket: '',
        accessKey: '',
        secretKey: '',
        domain: '',
      },
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style scoped></style>
