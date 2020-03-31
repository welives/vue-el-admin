<template>
  <div>
    <el-dialog
      :title="editIndex > -1 ? '修改管理员' : '添加管理员'"
      :visible.sync="adminDialog"
      width="80vw"
      @close="hide"
    >
      <el-form
        ref="addAdminForm"
        :model="adminForm"
        :rules="rules"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="登录账号" class="w-50" prop="username">
          <el-input
            v-model="adminForm.username"
            placeholder="请输入登录账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="w-50">
          <el-input
            v-model="adminForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" class="w-50" prop="nickname">
          <el-input
            v-model="adminForm.nickname"
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
            <img
              v-if="adminForm.avatar"
              :src="adminForm.avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户组" class="w-50" prop="level">
          <el-select v-model="adminForm.groupId" placeholder="请选择用户组">
            <el-option
              v-for="(item, index) in groupName"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" class="w-50" prop="phone">
          <el-input
            v-model="adminForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="w-50" prop="email">
          <el-input
            v-model="adminForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="adminForm.status"
            active-color="#13ce66"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="text-center">
        <el-button size="small" @click="adminDialog = false">取 消</el-button>
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
  name: 'AdminDialog',
  data() {
    return {
      adminDialog: false,
      editIndex: -1,
      adminForm: {
        id: 0,
        username: '',
        password: '',
        nickname: '',
        avatar: '',
        phone: '',
        email: '',
        groupId: 0,
        groupName: '',
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
      groupName: ['管理员', '财务', '运营专员', '客服'],
    }
  },
  computed: {},
  methods: {
    showDialog(data) {
      // 新增
      if (!data) {
        this.editIndex = -1
        this.adminForm.avatar = Mock.mock('@dataImage("60x60")')
      } else {
        // 修改
        this.adminForm = { ...data.row }
        this.editIndex = this.$parent.dataList.findIndex(
          (v) => v.id === data.row.id,
        )
      }
      this.adminDialog = true
    },
    hide() {
      this.adminForm = {
        id: 0,
        username: '',
        password: '',
        nickname: '',
        avatar: '',
        phone: '',
        email: '',
        groupId: 0,
        groupName: '',
        status: true,
      }
      this.adminDialog = false
    },
    submitForm() {
      this.$refs.addAdminForm.validate((valid) => {
        if (valid) {
          // 新增
          const msg = this.editIndex > -1 ? '修改成功' : '添加成功'
          if (this.editIndex === -1) {
            this.adminForm.id =
              this.$parent.dataList[this.$parent.dataList.length - 1].id + 1
            this.adminForm.createTime = Mock.mock('@now')
            this.adminForm.lastTime = Mock.mock('@now')
            this.$store.commit('manager/ADD_admin', this.adminForm)
            this.$parent.page.total = this.$parent.dataList.length
          } else {
            // 修改
            this.$store.commit('manager/UPDATE_admin', this.adminForm)
          }
          this.$message({
            message: msg,
            type: 'success',
          })
          this.hide()
        }
      })
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
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
</style>
