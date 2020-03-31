<template>
  <div>
    <el-dialog
      :title="editIndex > -1 ? '修改角色' : '添加角色'"
      :visible.sync="roleDialog"
      width="30vw"
      @close="hide"
    >
      <el-form
        ref="addRoleForm"
        :model="roleForm"
        :rules="rules"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="角色名称" class="w-100" prop="name">
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
        <el-button size="small" @click="roleDialog = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="submitForm"
          :disabled="roleForm.name === ''"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Mock from 'mockjs'
export default {
  name: 'RoleDialog',
  data() {
    return {
      editIndex: -1,
      roleDialog: false,
      roleForm: {
        id: 0,
        name: '',
        status: true,
        createTime: '',
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
      },
    }
  },
  methods: {
    showDialog(data) {
      // 新增
      if (!data) {
        this.editIndex = -1
      } else {
        // 修改
        this.roleForm = { ...data.row }
        this.editIndex = this.$parent.dataList.findIndex(
          (v) => v.id === data.row.id,
        )
      }
      this.roleDialog = true
    },
    hide() {
      this.roleForm = {
        id: 0,
        name: '',
        status: true,
        createTime: '',
      }
      this.roleDialog = false
    },
    submitForm() {
      this.$refs.addRoleForm.validate((valid) => {
        if (valid) {
          // 新增
          const msg = this.editIndex > -1 ? '修改成功' : '添加成功'
          if (this.editIndex === -1) {
            this.roleForm.id =
              this.$parent.dataList[this.$parent.dataList.length - 1].id + 1
            this.roleForm.createTime = Mock.mock('@now')
            this.$store.commit('role/ADD_role', this.roleForm)
            this.$parent.page.total = this.$parent.dataList.length
          } else {
            // 修改
            this.$store.commit('role/UPDATE_role', this.roleForm)
          }
          this.$message({
            message: msg,
            type: 'success',
          })
          this.hide()
        }
      })
    },
  },
}
</script>

<style scoped></style>
