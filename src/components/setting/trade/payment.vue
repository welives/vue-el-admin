<template>
  <div>
    <!-- 表格数据 -->
    <el-table :data="dataList" border class="mt-2">
      <el-table-column #default="scope" label="支付方式" align="left">
        <div class="media d-flex align-items-center">
          <img class="mr-2 rounded" :src="scope.row.src" style="width: 40px;" />
          <div class="media-body">
            <div>{{ scope.row.name }}</div>
            <small class="text-muted">{{ scope.row.desc }}</small>
          </div>
        </div>
      </el-table-column>
      <el-table-column #default="scope" label="是否启用" align="center">
        <el-switch
          v-model="scope.row.status"
          active-color="#13ce66"
          @change="statusChange(scope)"
        ></el-switch>
      </el-table-column>
      <el-table-column #default="scope" label="操作" align="center" width="180">
        <el-button
          type="primary"
          size="mini"
          plain
          class="mr-2"
          @click="openDrawer(scope)"
          >配置</el-button
        >
      </el-table-column>
    </el-table>
    <el-drawer
      :title="drawerType === 'alipay' ? '支付宝设置' : '微信支付设置'"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="drawerClose"
      :show-close="false"
      size="40%"
    >
      <div
        class="position-absolute"
        style="left: 0; right: 0; top: 52px; bottom: 60px; overflow-y: auto"
      >
        <el-form
          v-if="drawerType === 'alipay'"
          :model="form"
          ref="form"
          label-width="80px"
          size="small"
          class="py-3"
          style="width: 90%;"
        >
          <el-form-item label="app_id">
            <el-input
              v-model="form.alipay.app_id"
              placeholder="app_id"
            ></el-input>
          </el-form-item>
          <el-form-item label="公钥">
            <el-input
              type="textarea"
              rows="5"
              v-model="form.alipay.ali_public_key"
              placeholder="公钥"
            ></el-input>
          </el-form-item>
          <el-form-item label="私钥">
            <el-input
              type="textarea"
              rows="5"
              v-model="form.alipay.private_key"
              placeholder="私钥"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          v-if="drawerType === 'wxpay'"
          :model="form"
          ref="form"
          label-width="120px"
          size="small"
          class="py-3"
          style="width: 90%;"
        >
          <el-form-item label="公众号APPID">
            <el-input
              v-model="form.wxpay.app_id"
              placeholder="公众号APPID"
            ></el-input>
          </el-form-item>
          <el-form-item label="小程序APPID">
            <el-input
              v-model="form.wxpay.miniapp_id"
              placeholder="小程序APPID"
            ></el-input>
          </el-form-item>
          <el-form-item label="小程序secret">
            <el-input
              v-model="form.wxpay.secret"
              placeholder="小程序secret"
            ></el-input>
          </el-form-item>
          <el-form-item label="商户号">
            <el-input
              v-model="form.wxpay.mch_id"
              placeholder="商户号"
            ></el-input>
          </el-form-item>
          <el-form-item label="API密钥">
            <el-input v-model="form.wxpay.key" placeholder="API密钥"></el-input>
          </el-form-item>
          <el-form-item label="cert_client">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              accept=".pem"
              :on-success="uploadClientSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                <div class="text-danger">
                  {{ form.wxpay.cert_client || '还未设置' }}
                </div>
                <div class="text-muted">
                  <small>例如: apiclient_cert.pem</small>
                </div>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="cert_key">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              accept=".pem"
              :on-success="uploadKeySuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                <div class="text-danger">
                  {{ form.wxpay.cert_key || '还未设置' }}
                </div>
                <div class="text-muted">
                  <small>例如: apiclient_key.pem</small>
                </div>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div
        class="position-absolute border d-flex align-items-center px-3"
        style="height: 60px; left: 0; right: 0; bottom: 0"
      >
        <el-button @click="closeDrawer">取消</el-button>
        <el-button type="primary" @click="submitDrawer">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Payment',
  inject: ['$layout'],
  data() {
    return {
      editIndex: -1,
      drawer: false,
      drawerType: '',
      form: {
        alipay: {},
        wxpay: {},
      },
    }
  },
  computed: {
    ...mapState({
      dataList: (state) => state.trade.paymentList,
    }),
  },
  created() {
    this.__init()
  },
  methods: {
    __init() {
      this.$layout.showLoading()
      this.$store.dispatch('trade/getPaymentList')
      this.$layout.hideLoading()
    },
    statusChange(data) {
      this.$store.commit('trade/UPDATE_status', data)
    },
    drawerClose() {
      this.$confirm('确认关闭？')
        .then(() => {
          this.closeDrawer()
        })
        .catch(() => {})
    },
    openDrawer(data) {
      this.editIndex = this.dataList.findIndex((v) => v.id === data.row.id)
      this.drawerType = data.row.key
      this.form[this.drawerType] = data.row.payConfig
      this.drawer = true
    },
    closeDrawer() {
      this.form[this.drawerType] = {}
      this.editIndex = -1
      this.drawerType = ''
      this.drawer = false
    },
    submitDrawer() {
      this.$store.commit('trade/UPDATE_payment', {
        index: this.editIndex,
        value: this.form[this.drawerType],
      })
      this.$message({
        message: '修改成功',
        type: 'success',
      })
      this.closeDrawer()
    },
    uploadClientSuccess() {},
    uploadKeySuccess() {},
  },
}
</script>

<style scoped></style>
