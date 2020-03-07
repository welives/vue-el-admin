<template>
  <div>
    <el-form label-width="80px" size="small" class="w-100">
      <el-form-item label="折扣率" class="w-25">
        <el-input
          :value="discountRate"
          type="number"
          placeholder=""
          min="0"
          @input="changeState({ key: 'discountRate', value: $event })"
        >
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'DiscountSetting',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['discountRate'])
  },
  methods: {
    ...mapMutations('goods', ['changeState'])
  }
}
</script>

<style scoped></style>
