<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5">
          <div class="card mt-5">
            <div class="card-header bg-white">
              <h3 class="text-center mb-0 text-secondary font-weight-bold">
                {{ $conf.loginTitle }}
              </h3>
            </div>
            <div class="card-body">
              <el-form
                ref="loginForm"
                :model="form"
                :rules="rules"
                @keyup.enter.native="login"
              >
                <el-form-item prop="username">
                  <el-input v-model="form.username" placeholder="请输入用户名">
                    <i
                      slot="prefix"
                      class="el-icon-user-solid ml-1 mr-2 h6"
                    ></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="form.password"
                    :type="passwordType"
                    placeholder="请输入密码"
                  >
                    <i slot="prefix" class="el-icon-lock ml-1 mr-2 h6"></i>
                    <i
                      class="el-icon-view el-input__icon"
                      slot="suffix"
                      style="cursor: pointer;"
                      @click="showPassword"
                    ></i>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    class="w-100"
                    :disabled="isActive"
                    :loading="loading"
                    @click="login"
                    >{{ loading ? '登录中...' : '登录' }}</el-button
                  >
                  <div class="mt-3" style="line-height: normal;">
                    <p class="mb-0">
                      <small>账号 : admin 密码 : admin</small>
                    </p>
                    <p class="mb-0">
                      <small>账号 : editor 密码 : 123456</small>
                    </p>
                  </div>
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
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        return callback(new Error('请输入正确的用户名'))
      }
      callback()
    }
    return {
      loading: false,
      passwordType: 'password',
      form: {
        username: 'admin',
        password: 'admin',
      },
      rules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername,
          },
          {
            min: 4,
            max: 16,
            message: '用户名长度4到16个字符',
            trigger: 'blur',
          },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  computed: {
    isActive() {
      return !(this.form.username !== '' && this.form.password !== '')
    },
  },
  methods: {
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return
        this.loading = true
        this.$store
          .dispatch('admin/login', this.form)
          .then(() => {
            this.loading = false
            this.$router.push({ name: 'index' })
          })
          .catch((error) => {
            this.loading = false
            console.log(error)
          })
      })
    },
  },
}
</script>

<style scoped></style>
