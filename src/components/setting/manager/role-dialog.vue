<template>
  <div>
    <el-dialog
      :title="roleDialogTitle"
      :visible.sync="roleDialog"
      width="80vw"
      @close="hide"
    >
      <el-form
        ref="addRoleForm"
        :model="roleForm"
        :rules="rules"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="角色名称" class="w-50" prop="name">
          <el-input
            v-model="roleForm.name"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="roleForm.status"
            active-color="#13ce66"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="text-center">
        <el-button size="small" @click="hide">取 消</el-button>
        <el-button type="primary" size="small" @click="submitForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleDialog',
  data() {
    return {
      roleDialog: false,
      editIndex: -1,
      nextId: 10,
      roleForm: {
        id: '',
        name: '',
        status: true,
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
      },
    }
  },
  computed: {
    roleDialogTitle() {
      return this.editIndex === -1 ? '添加管理员' : '修改管理员'
    },
  },
  methods: {
    showDialog(data) {
      // 新增
      if (!data) {
        this.editIndex = -1
      } else {
        // 修改
        // Object.assign(this.roleForm, data.row)
        this.roleForm = { ...data.row }
        this.editIndex = data.$index
      }
      this.roleDialog = true
    },
    hide() {
      this.roleForm = {
        id: this.nextId,
        name: '',
        status: true,
      }
      this.roleDialog = false
    },
    submitForm() {
      this.$refs.addRoleForm.validate((valid) => {
        if (valid) {
          // 新增
          let msg = '添加'
          if (this.editIndex === -1) {
            this.roleForm.id = this.nextId
            this.$parent.tableData.push(this.roleForm)
            this.nextId++
          } else {
            // 修改
            msg = '修改'
            Object.assign(this.$parent.tableData[this.editIndex], this.roleForm)
          }
          this.$message({
            message: msg + '成功',
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

<style scoped></style>
