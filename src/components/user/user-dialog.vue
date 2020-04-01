<template>
  <div>
    <el-dialog
      :title="editIndex > -1 ? '修改会员' : '添加会员'"
      :visible.sync="userFormDialog"
      width="80vw"
      @close="hide"
    >
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="rules"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="用户名" class="w-50" prop="username">
          <el-input
            v-model="userForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          class="w-50"
          v-if="editIndex === -1"
        >
          <el-input
            v-model="userForm.password"
            :type="passwordType"
            placeholder="请输入密码"
          >
            <i
              class="el-icon-view el-input__icon"
              slot="suffix"
              style="cursor: pointer;"
              @click="showPassword"
            ></i
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" class="w-50" prop="nickname">
          <el-input
            v-model="userForm.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像" class="w-50" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="等级" class="w-50" prop="level">
          <el-select v-model="userForm.level" placeholder="请选择会员等级">
            <el-option
              v-for="(item, index) in $parent.levelName"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" class="w-50" prop="phone">
          <el-input
            v-model="userForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="w-50" prop="email">
          <el-input
            v-model="userForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" class="w-50" prop="sex">
          <el-radio-group v-model="userForm.sex" size="mini">
            <el-radio-button :label="0">保密</el-radio-button>
            <el-radio-button :label="1">男</el-radio-button>
            <el-radio-button :label="2">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="userForm.status"
            active-color="#13ce66"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="text-center">
        <el-button size="small" @click="userFormDialog = false"
          >取 消</el-button
        >
        <el-button type="primary" size="small" @click="submitForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Mock from 'mockjs'
export default {
  name: 'UserDialog',
  data() {
    return {
      userFormDialog: false,
      passwordType: 'password',
      editIndex: -1,
      userForm: {
        id: 0,
        username: '',
        password: '',
        nickname: '',
        avatar: '',
        phone: '',
        email: '',
        sex: 0,
        level: 0,
        status: true,
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
      },
    }
  },
  methods: {
    showDialog(data) {
      // 新增
      if (!data) {
        this.editIndex = -1
        this.userForm.avatar = Mock.mock('@dataImage("60x60")')
      } else {
        // 修改
        this.userForm = { ...data.row }
        this.editIndex = this.$parent.dataList.findIndex(
          (v) => v.id === data.row.id,
        )
      }
      this.userFormDialog = true
    },
    hide() {
      this.userForm = {
        id: 0,
        username: '',
        password: '',
        nickname: '',
        avatar: '',
        phone: '',
        email: '',
        sex: 0,
        level: 0,
        status: true,
      }
      this.userFormDialog = false
    },
    submitForm() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          // 新增
          const msg = this.editIndex > -1 ? '修改成功' : '添加成功'
          if (this.editIndex === -1) {
            this.userForm.id =
              this.$parent.dataList[this.$parent.dataList.length - 1].id + 1
            this.userForm.createTime = Mock.mock('@now')
            this.userForm.lastTime = Mock.mock('@now')
            this.$store.commit('users/ADD_user', this.userForm)
            this.$parent.page.total = this.$parent.dataList.length
          } else {
            // 修改
            this.$store.commit('users/UPDATE_user', this.userForm)
          }
          this.$message({
            message: msg,
            type: 'success',
          })
          this.hide()
        }
      })
    },
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleAvatarSuccess(e) {
      console.log(e)
    },
    beforeAvatarUpload(e) {
      console.log(e)
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
  }
  .avatar {
    width: 48px;
    height: 48px;
    display: block;
  }
}
</style>
