<template>
  <div>
    <!-- 表格数据 -->
    <el-table :data="tableData" border class="mt-2">
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
        ></el-switch>
      </el-table-column>
      <el-table-column #default="scope" label="操作" align="center" width="180">
        <el-button type="warning" size="mini" plain class="mr-2"
          >配置</el-button
        >
        <el-popconfirm
          title="是否删除该条数据？"
          @onConfirm="deleteItem(scope.$index)"
        >
          <el-button slot="reference" type="danger" size="mini" plain
            >删除</el-button
          >
        </el-popconfirm>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Payment',
  data() {
    return {
      tableData: [
        {
          name: '银联卡支付',
          desc: '该系统支持即时到账接口',
          src: 'http://wxcs.niuteam.cn/addons/NsUnionPay/ico.png',
          status: true
        },
        {
          name: '支付宝支付',
          desc: '该系统支持即时到账接口',
          src: 'http://wxcs.niuteam.cn/addons/NsAlipay/ico.png',
          status: true
        },
        {
          name: '微信支付',
          desc: '该系统支持微信网页支付和扫码支付',
          src: 'http://wxcs.niuteam.cn/addons/NsWeixinpay/ico.png',
          status: true
        }
      ]
    }
  },
  methods: {
    deleteItem(index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style scoped></style>
