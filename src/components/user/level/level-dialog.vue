<template>
  <div>
    <el-dialog
      :title="levelDialogTitle"
      :visible.sync="levelDialog"
      width="50vw"
      @close="hide"
    >
      <el-form
        ref="addLevelForm"
        :model="levelForm"
        :rules="rules"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="等级名称" class="w-50" prop="name">
          <el-input v-model="levelForm.name" placeholder="等级名称"></el-input>
          <small class="text-muted d-block">设置会员等级名称</small>
        </el-form-item>
        <el-form-item label="等级权重" prop="order">
          <el-input-number v-model="levelForm.order" :min="0"></el-input-number>
          <small class="text-muted d-block"
            >设置会员等级排序(此参数决定的等级的高低,排序越大等级越高,请谨慎选择)</small
          >
        </el-form-item>
        <el-form-item label="升级条件">
          <div class="mb-2">
            <small class="mr-2">累计消费满</small>
            <el-input
              v-model="levelForm.consume"
              type="number"
              :min="0"
              placeholder="累计消费"
              class="w-25"
            >
              <template slot="append">元</template>
            </el-input>
            <small class="text-muted ml-2"
              >设置会员等级所需要的累计消费金额,必须大于或等于0</small
            >
          </div>
          <div>
            <small class="mr-2">累计次数满</small>
            <el-input
              v-model="levelForm.times"
              type="number"
              :min="0"
              placeholder="累计次数"
              class="w-25"
            >
              <template slot="append">次</template>
            </el-input>
            <small class="text-muted ml-2"
              >设置会员等级所需要的累计消费次数,必须大于或等于0</small
            >
          </div>
        </el-form-item>
        <el-form-item label="折扣率(%)" prop="discount">
          <el-input
            v-model="levelForm.discount"
            type="number"
            :min="0"
            class="w-25"
            placeholder="请输入折扣率"
          >
            <template slot="append">%</template>
          </el-input>
          <small class="text-muted d-block"
            >折扣率单位为百分比,如输入90,表示该会员等级的用户可以以商品原价的90%购买</small
          >
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="levelForm.status"
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
  name: 'LevelDialog',
  data() {
    return {
      levelDialog: false,
      editIndex: -1,
      nextId: 10,
      levelForm: {
        id: '',
        name: '',
        consume: 0,
        times: 0,
        discount: 0,
        order: 0,
        status: true,
      },
      rules: {
        name: [
          { required: true, message: '等级名称不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    levelDialogTitle() {
      return this.editIndex === -1 ? '添加会员等级' : '修改会员等级'
    },
  },
  methods: {
    showDialog(data) {
      // 新增
      if (!data) {
        this.editIndex = -1
      } else {
        // 修改
        // Object.assign(this.levelForm, data.row)
        this.levelForm = { ...data.row }
        this.editIndex = data.$index
      }
      this.levelDialog = true
    },
    hide() {
      this.levelForm = {
        id: this.nextId,
        name: '',
        consume: 0,
        times: 0,
        discount: 0,
        order: 0,
        status: true,
      }
      this.levelDialog = false
    },
    submitForm() {
      this.$refs.addLevelForm.validate((valid) => {
        if (valid) {
          let msg = '添加'
          if (this.editIndex === -1) {
            // 新增
            this.levelForm.id = this.nextId
            this.$parent.tableData.push(this.levelForm)
            this.nextId++
          } else {
            // 修改
            msg = '修改'
            Object.assign(
              this.$parent.tableData[this.editIndex],
              this.levelForm,
            )
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
