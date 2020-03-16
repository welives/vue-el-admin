<template>
  <div>
    <el-dialog
      :title="specFormDialogTitle"
      :visible.sync="specFormDialog"
      width="50vw"
      @close="hide"
    >
      <el-form
        ref="addSpecForm"
        :model="specForm"
        :rules="rules"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="规格名称" class="w-50" prop="name">
          <el-input
            v-model="specForm.name"
            placeholder="请输入规格名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="specForm.order" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="specForm.status">
            <el-radio :label="true" border>启用</el-radio>
            <el-radio :label="false" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="specForm.type">
            <el-radio :label="0" border>文字</el-radio>
            <el-radio :label="1" border>颜色</el-radio>
            <el-radio :label="2" border>图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格值" class="w-75" prop="value">
          <el-input
            v-model="specForm.value"
            type="textarea"
            :rows="3"
            placeholder="请输入规格值,多个值之间用逗号隔开"
          ></el-input>
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
  name: 'SpecDialog',
  data() {
    return {
      specFormDialog: false,
      editIndex: -1,
      nextId: 10,
      specForm: {
        id: '',
        name: '',
        value: '',
        order: 100,
        status: true,
        type: 0,
      },
      rules: {
        name: [
          { required: true, message: '规格名称不能为空', trigger: 'blur' },
        ],
        value: [{ required: true, message: '规格值不能为空', trigger: 'blur' }],
      },
    }
  },
  computed: {
    specFormDialogTitle() {
      return this.editIndex === -1 ? '添加规格' : '修改规格'
    },
  },
  methods: {
    showDialog(data) {
      // 新增
      if (!data) {
        this.editIndex = -1
      } else {
        // 修改
        this.specForm = { ...data.row }
        // this.specForm.value = data.row.value.replace(/,/g, '\n')
        this.editIndex = data.$index
      }
      this.specFormDialog = true
    },
    hide() {
      this.specForm = {
        id: this.nextId,
        name: '',
        value: '',
        order: 100,
        status: true,
        type: 0,
      }
      this.specFormDialog = false
    },
    submitForm() {
      this.$refs.addSpecForm.validate((valid) => {
        if (valid) {
          // 新增
          let msg = '添加'
          if (this.editIndex === -1) {
            this.specForm.id = this.nextId
            // this.specForm.value = this.specForm.value.replace(/\n/g, ',')
            this.$parent.tableData.push(this.specForm)
            this.nextId++
          } else {
            // 修改
            // this.specForm.value = this.specForm.value.replace(/\n/g, ',')
            msg = '修改'
            Object.assign(this.$parent.tableData[this.editIndex], this.specForm)
          }
          this.$message({
            message: msg + '成功',
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
