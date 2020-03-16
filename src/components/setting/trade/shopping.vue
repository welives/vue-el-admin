<template>
  <div>
    <el-form
      ref="shoppingForm"
      :model="shoppingForm"
      label-width="120px"
      size="small"
    >
      <el-form-item label="未支付订单" prop="unpaid">
        <el-input v-model="shoppingForm.unpaid" placeholder="" class="w-25">
          <template slot="append">
            天后自动关闭
          </template>
        </el-input>
        <small class="text-muted d-block">
          订单下单未付款,n天后自动关闭,设置0表示不自动关闭
        </small>
      </el-form-item>
      <el-form-item label="已发货订单" prop="shipped">
        <el-input v-model="shoppingForm.shipped" placeholder="" class="w-25">
          <template slot="append">
            天后自动确认收货
          </template>
        </el-input>
        <small class="text-muted d-block">
          如果在期间未确认收货,系统自动完成收货,设置0表示不自动收货
        </small>
      </el-form-item>
      <el-form-item label="已完成订单" prop="finished">
        <el-input v-model="shoppingForm.finished" placeholder="" class="w-25">
          <template slot="append">
            天内允许申请售后
          </template>
        </el-input>
        <small class="text-muted d-block">
          订单完成后,用户在n天内可以发起售后申请,设置0表示不允许申请售后
        </small>
      </el-form-item>
      <el-form-item label="运费组合策略" prop="tactics">
        <el-select v-model="shoppingForm.tactics" placeholder="请选择">
          <el-option label="策略一" :value="1"></el-option>
          <el-option label="策略二" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="text-center w-50">
        <el-button type="primary" size="medium">确定</el-button>
        <el-button size="medium" @click="resetForm('shoppingForm')"
          >重填
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Shopping',
  data() {
    return {
      shoppingForm: {
        unpaid: '',
        shipped: '',
        finished: '',
        tactics: '',
      },
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style scoped></style>
