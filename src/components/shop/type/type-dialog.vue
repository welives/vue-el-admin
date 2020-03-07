<template>
  <div>
    <el-dialog
      :title="typeFormDialogTitle"
      :visible.sync="typeFormDialog"
      width="80vw"
      @close="hide"
    >
      <el-form
        ref="addTypeForm"
        :model="typeForm"
        :rules="rules"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="类型名称" class="w-50" prop="name">
          <el-input
            v-model="typeForm.name"
            placeholder="请输入类型名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="typeForm.order" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="typeForm.status">
            <el-radio :label="true" border>启用</el-radio>
            <el-radio :label="false" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联规格">
          <div class="d-flex">
            <span
              v-for="(spec, index) in getEditSpecList"
              :key="index"
              class="border rounded px-3 mr-2 spec-list-item"
              style="cursor: pointer;"
            >
              <span>{{ spec.name }}</span>
              <i class="el-icon-delete text-danger"></i>
            </span>
            <el-button
              size="mini"
              icon="el-icon-plus"
              class="text-primary"
            ></el-button>
          </div>
        </el-form-item>
        <el-form-item label="属性列表" class="w-100">
          <el-table :data="typeForm.valueList" border stripe>
            <el-table-column
              label="排序"
              prop="order"
              #default="scope"
              header-align="center"
              width="120"
            >
              <el-input
                v-model="scope.row.order"
                placeholder=""
                min="0"
                type="number"
                size="mini"
              ></el-input>
            </el-table-column>
            <el-table-column
              label="属性名称"
              prop="name"
              #default="scope"
              header-align="center"
            >
              <el-input
                v-model="scope.row.name"
                size="mini"
                placeholder="请输入属性名称"
              ></el-input>
            </el-table-column>
            <el-table-column
              label="所属类型"
              prop="type"
              #default="scope"
              header-align="center"
              width="150"
            >
              <el-select
                v-model="scope.row.type"
                placeholder="请选择所属类型"
                size="mini"
                @change="$event !== 'input' ? (scope.row.isEdit = true) : ''"
              >
                <el-option label="输入框" value="input"></el-option>
                <el-option label="单选框" value="radio"></el-option>
                <el-option label="多选框" value="checkbox"></el-option>
              </el-select>
            </el-table-column>
            <el-table-column
              label="属性值"
              prop="value"
              header-align="center"
              #default="scope"
            >
              <div v-if="scope.row.type !== 'input'">
                <el-input
                  v-if="scope.row.isEdit"
                  v-model="scope.row.value"
                  size="mini"
                  placeholder="请输入属性值,多个值之间用逗号隔开"
                  type="textarea"
                ></el-input>
                <span v-else class="small">{{ scope.row.value }}</span>
              </div>
            </el-table-column>
            <el-table-column
              label="是否显示"
              prop="status"
              #default="scope"
              width="100"
              header-align="center"
            >
              <div class="d-flex align-items-center justify-content-center">
                <el-switch
                  v-model="scope.row.isShow"
                  active-color="#13ce66"
                ></el-switch>
              </div>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
              header-align="center"
              #default="scope"
            >
              <div class="d-flex align-items-center justify-content-center">
                <el-button
                  v-if="scope.row.type !== 'input'"
                  :type="scope.row.isEdit ? 'success' : 'warning'"
                  plain
                  class="mr-2"
                  @click="scope.row.isEdit = !scope.row.isEdit"
                  >{{ scope.row.isEdit ? '完成' : '编辑' }}</el-button
                >
                <el-popconfirm
                  title="是否删除条数据？"
                  @onConfirm="deleteItem(scope.$index)"
                >
                  <el-button slot="reference" type="danger" size="mini" plain
                    >删除</el-button
                  >
                </el-popconfirm>
              </div>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="text" icon="el-icon-plus" @click="addValueList"
            >添加一个属性</el-button
          >
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
  name: 'TypeDialog',
  data() {
    return {
      typeFormDialog: false,
      editIndex: -1,
      nextId: 10,
      typeForm: {
        id: '',
        name: '',
        order: 100,
        status: true,
        specList: [],
        valueList: []
      },
      rules: {
        name: [{ required: true, message: '类型名称不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    typeFormDialogTitle() {
      return this.editIndex === -1 ? '添加类型' : '修改类型'
    },
    getEditSpecList() {
      if (this.editIndex === -1) {
        return []
      }
      return this.$parent.tableData[this.editIndex].specList
    }
  },
  methods: {
    showDialog(data) {
      // 新增
      if (!data) {
        this.editIndex = -1
      } else {
        // 修改
        // Object.assign(this.typeForm, data.row)
        this.typeForm = { ...data.row }
        this.editIndex = data.$index
      }
      this.typeFormDialog = true
    },
    hide() {
      this.typeForm = {
        id: this.nextId,
        name: '',
        order: 100,
        status: true,
        specList: [],
        valueList: []
      }
      this.typeFormDialog = false
    },
    submitForm() {
      this.$refs.addTypeForm.validate((valid) => {
        if (valid) {
          let res = true
          const message = []
          this.typeForm.valueList.forEach((v, index) => {
            if (v.order === '') {
              res = res && false
              message.push(`第${index + 1}行<i>排序</i>不能为空`)
            }
            if (v.name === '') {
              res = res && false
              message.push(`第${index + 1}行<i>属性名称</i>不能为空`)
            }
            if (v.type !== 'input' && v.value === '') {
              res = res && false
              message.push(`第${index + 1}行<i>属性</i>不能为空`)
            }
          })
          if (!res) {
            return this.$notify({
              title: '错误',
              type: 'error',
              duration: 3000,
              dangerouslyUseHTMLString: true,
              message: message.join('<br />')
            })
          }
          // 新增
          let msg = '添加'
          if (this.typeForm.valueList.length > 0) {
            this.typeForm.valueList.forEach((v) => (v.isEdit = false))
          }
          if (this.editIndex === -1) {
            this.typeForm.id = this.nextId
            this.$parent.tableData.push(this.typeForm)
            this.nextId++
          } else {
            // 修改
            msg = '修改'
            Object.assign(this.$parent.tableData[this.editIndex], this.typeForm)
          }
          this.$message({
            message: msg + '成功',
            type: 'success'
          })
          this.hide()
        }
      })
    },
    changeType(data, e) {
      if (e !== 'input') {
        data.row.isEdit = true
      }
    },
    addValueList() {
      this.typeForm.valueList.push({
        order: 100,
        name: '',
        type: 'input',
        value: '',
        isShow: true,
        isEdit: true
      })
    },
    deleteItem(index) {
      this.typeForm.valueList.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.spec-list-item {
  transition: all 0.5s linear;
}
.spec-list-item:hover {
  background-color: #f4f4f4;
}
.spec-list-item:hover > span {
  display: none;
}
.spec-list-item > i {
  display: none;
}
.spec-list-item:hover > i {
  display: inline-block;
}
</style>
