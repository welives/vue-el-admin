<template>
  <div>
    <el-form ref="dataForm" :model="dataForm" label-width="120px" size="small">
      <el-form-item label="未支付订单" prop="close_order_day">
        <el-input
          v-model="dataForm.close_order_day"
          placeholder=""
          class="w-25"
        >
          <template slot="append">
            天后自动关闭
          </template>
        </el-input>
        <small class="text-muted d-block">
          订单下单未付款,n天后自动关闭,设置0表示不自动关闭
        </small>
      </el-form-item>
      <el-form-item label="已发货订单" prop="auto_received_day">
        <el-input
          v-model="dataForm.auto_received_day"
          placeholder=""
          class="w-25"
        >
          <template slot="append">
            天后自动确认收货
          </template>
        </el-input>
        <small class="text-muted d-block">
          如果在期间未确认收货,系统自动完成收货,设置0表示不自动收货
        </small>
      </el-form-item>
      <el-form-item label="已完成订单" prop="after_sale_day">
        <el-input v-model="dataForm.after_sale_day" placeholder="" class="w-25">
          <template slot="append">
            天内允许申请售后
          </template>
        </el-input>
        <small class="text-muted d-block">
          订单完成后,用户在n天内可以发起售后申请,设置0表示不允许申请售后
        </small>
      </el-form-item>
      <el-form-item class="text-center w-50">
        <el-button type="primary" size="medium" @click="submitForm"
          >确定</el-button
        >
        <el-button size="medium" @click="cancelForm">取消 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Shopping',
  inject: ['$layout'],
  data() {
    return {
      dataForm: {
        close_order_day: '',
        auto_received_day: '',
        after_sale_day: '',
      },
    }
  },
  created() {
    this.__init()
  },
  methods: {
    __init() {
      this.$layout.showLoading()
      this.$store.dispatch('trade/getShoppingConfig').then((res) => {
        this.dataForm = res
      })
      this.$layout.hideLoading()
    },
    submitForm() {
      this.$store.commit('trade/SET_shoppingConfig', this.dataForm)
      this.$message({
        message: '修改成功',
        type: 'success',
      })
    },
    cancelForm() {
      this.$store.dispatch('trade/getShoppingConfig').then((res) => {
        this.dataForm = { ...res }
      })
    },
  },
}
</script>

<style scoped></style>
