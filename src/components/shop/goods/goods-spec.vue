<template>
  <div>
    <!-- 规格选项 -->
    <el-form label-width="80px" size="small" class="w-100">
      <el-form-item label="商品规格" class="w-50">
        <el-radio-group
          :value="spec"
          @input="changeState({ key: 'spec', value: $event })"
        >
          <el-radio-button :label="0">单一规格</el-radio-button>
          <el-radio-button :label="1">多规格</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!-- 单规格 -->
    <template v-if="!spec">
      <el-form
        ref="singleSpec"
        :model="singleSpecForm"
        label-width="80px"
        size="small"
        class="w-100"
      >
        <el-form-item label="销售价格" prop="sPrice" class="w-50">
          <el-input
            v-model="singleSpecForm.sPrice"
            type="number"
            min="0"
            autofocus
            @change="singleSpecFormModel({ key: 'sPrice', value: $event })"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="mPrice" class="w-50">
          <el-input
            v-model="singleSpecForm.mPrice"
            type="number"
            min="0"
            @change="singleSpecFormModel({ key: 'mPrice', value: $event })"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="成本价格" prop="cPrice" class="w-50">
          <el-input
            v-model="singleSpecForm.cPrice"
            type="number"
            min="0"
            @change="singleSpecFormModel({ key: 'cPrice', value: $event })"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品体积" prop="volume" class="w-50">
          <el-input
            v-model="singleSpecForm.volume"
            type="number"
            min="0"
            @change="singleSpecFormModel({ key: 'volume', value: $event })"
          >
            <template slot="append">立方米</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="weight" class="w-50">
          <el-input
            v-model="singleSpecForm.weight"
            type="number"
            min="0"
            @change="singleSpecFormModel({ key: 'weight', value: $event })"
          >
            <template slot="append">公斤</template>
          </el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock" class="w-50">
          <el-input
            v-model="singleSpecForm.stock"
            type="number"
            min="0"
            @change="singleSpecFormModel({ key: 'stock', value: $event })"
          >
            <template slot="append">件</template>
          </el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code" class="w-50">
          <el-input
            v-model="singleSpecForm.code"
            @change="singleSpecFormModel({ key: 'code', value: $event })"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="text-center w-50">
          <el-button type="primary" size="medium">提交</el-button>
          <el-button size="medium" @click="resetForm('singleSpec')"
            >重填</el-button
          >
        </el-form-item>
      </el-form>
    </template>
    <!-- 多规格 -->
    <template v-else>
      <el-form ref="multipleSpec" label-width="80px" size="small" class="w-100">
        <el-form-item label="添加规格">
          <!-- 规格卡片 -->
          <spec-card
            v-for="(card, index) in multipleSpecCard"
            :key="index"
            class="card mb-2"
            :card="card"
            :cardIndex="index"
          ></spec-card>
          <el-button type="success" size="mini" @click="addSpecCard"
            >添加规格</el-button
          >
        </el-form-item>
        <el-form-item label="批量设置" size="medium">
          <el-button
            v-for="(btn, index) in batchSetBtn"
            :key="index"
            type="text"
            @click="batchSet(btn)"
            >{{ btn.name }}</el-button
          >
        </el-form-item>
        <el-form-item label="规格设置">
          <spec-table ref="specTable"></spec-table>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
import specCard from './spec/spec-card.vue'
import specTable from './spec/spec-table.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'GoodsSpec',
  components: {
    specCard,
    specTable
  },
  data() {
    return {
      batchSetBtn: [
        { name: '销售价', key: 'sPrice' },
        { name: '市场价', key: 'mPrice' },
        { name: '成本价', key: 'cPrice' },
        { name: '库存', key: 'stock' },
        { name: '体积', key: 'volume' },
        { name: '重量', key: 'weight' }
      ]
    }
  },
  computed: {
    ...mapGetters(['spec', 'singleSpecForm', 'multipleSpecCard'])
  },
  methods: {
    ...mapMutations('goods', [
      'addSpecCard',
      'singleSpecFormModel',
      'changeState'
    ]),
    batchSet(btn) {
      this.$prompt('', '批量设置' + btn.name, {
        inputPlaceholder: '请输入' + btn.name,
        inputType: 'number',
        inputPattern: /^\d+(\.\d{1,6})?$/,
        inputErrorMessage: '只能输入正数,且小数点后不超过6位'
      })
        .then(({ value }) => {
          this.$refs.specTable.tableData.forEach((v) => {
            v[btn.key] = value
          })
          this.$message({
            message: '设置成功',
            type: 'success'
          })
        })
        .catch(() => {})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped></style>
