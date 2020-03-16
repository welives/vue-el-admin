<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5">
          <div class="card mt-5">
            <div class="card-header bg-white">
              <h3 class="text-center mb-0 text-secondary">{{ $conf.logo }}</h3>
            </div>
            <div class="card-body">
              <el-form
                ref="loginForm"
                :model="form"
                :rules="rules"
                @keyup.enter.native="login"
              >
                <el-form-item prop="username">
                  <el-input
                    v-model="form.username"
                    size="medium"
                    placeholder="请输入用户名"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="form.password"
                    size="medium"
                    type="password"
                    placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    size="medium"
                    class="w-100"
                    :disabled="isActive"
                    :loading="loading"
                    @click="login"
                    >{{ loading ? '登录中...' : '登录' }}</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      form: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 16, message: '用户名长度4到16个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    isActive() {
      return !(this.form.username !== '' && this.form.password !== '')
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return
        this.loading = true
        this.$store
          .dispatch('user/login', this.form)
          .then(() => {
            this.loading = false
            this.$router.push({ name: 'index' })
          })
          .catch((error) => {
            this.loading = false
            console.log(error)
          })
      })
    }
  }
}
</script>

<style scoped></style>
