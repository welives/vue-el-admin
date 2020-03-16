<template>
  <div>
    <el-form
      ref="expressForm"
      :model="expressForm"
      label-width="120px"
      size="small"
    >
      <el-form-item label="快递100" prop="customer">
        <el-input v-model="expressForm.customer" placeholder=""></el-input>
        <small class="text-muted d-block">
          用于查询物流信息,
          <el-link
            type="primary"
            href="https://www.kuaidi100.com/"
            target="_blank"
            :underline="false"
            icon="el-icon-link"
            >申请快递100
          </el-link>
        </small>
      </el-form-item>
      <el-form-item label="快递100 Key" prop="key">
        <el-input
          v-model="expressForm.key"
          placeholder=""
          class="w-50"
        ></el-input>
      </el-form-item>
      <el-form-item class="text-center w-50">
        <el-button type="primary" size="medium">确定</el-button>
        <el-button size="medium" @click="resetForm('expressForm')"
          >重填
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ExpressTrack',
  data() {
    return {
      expressForm: {
        customer: '',
        key: '',
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
