<template>
  <div>
    <el-dialog
      :title="editIndex > -1 ? '修改规格' : '添加规格'"
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
        <el-button size="small" @click="specFormDialog = false"
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
import { Random } from 'mockjs'
export default {
  name: 'SpecDialog',
  filters: {},
  data() {
    return {
      specFormDialog: false,
      editIndex: -1,
      specForm: {
        id: 0,
        name: '',
        order: 100,
        status: true,
        type: 0,
        value: '',
      },
      rules: {
        name: [
          { required: true, message: '规格名称不能为空', trigger: 'blur' },
        ],
        value: [{ required: true, message: '规格值不能为空', trigger: 'blur' }],
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
        this.specForm = { ...data.row }
        this.specForm.value = this.formatSpecValue(this.specForm.value)
        this.editIndex = this.$parent.dataList.findIndex(
          (v) => v.id === data.row.id,
        )
      }
      this.specFormDialog = true
    },
    hide() {
      this.specForm = {
        id: 0,
        name: '',
        order: 100,
        status: true,
        type: 0,
        value: '',
      }
      this.specFormDialog = false
    },
    submitForm() {
      this.$refs.addSpecForm.validate((valid) => {
        if (valid) {
          // 新增
          const msg = this.editIndex > -1 ? '修改成功' : '添加成功'
          if (this.editIndex === -1) {
            this.specForm.id =
              this.$parent.dataList[this.$parent.dataList.length - 1].id + 1
            this.specForm.value = this.formatSpecValue(this.specForm.value)
            this.$store.commit('spec/ADD_spec', this.specForm)
            this.$parent.page.total = this.$parent.dataList.length
          } else {
            // 修改
            this.specForm.value = this.formatSpecValue(this.specForm.value)
            this.$store.commit('spec/UPDATE_spec', this.specForm)
          }
          this.$message({
            message: msg,
            type: 'success',
          })
          this.hide()
        }
      })
    },
    // 格式化规格值
    formatSpecValue(value) {
      if (typeof value === 'object') {
        const arr = value.map((v) => v.name)
        return arr.join(',')
      }
      if (typeof value === 'string') {
        let arr = value.split(',')
        arr = arr.map((v) => {
          return {
            name: v,
            color: '',
            image: '',
            isCheck: false,
          }
        })
        return arr
      }
    },
  },
}
</script>

<style scoped></style>
