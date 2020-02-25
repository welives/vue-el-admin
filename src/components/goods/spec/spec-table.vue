<template>
  <table class="table table-bordered table-striped table-hover">
    <thead class="text-center">
      <tr>
        <th
          v-for="(th, thIdx) in getThead"
          :key="thIdx"
          scope="col"
          class="align-middle"
          :colspan="th.colspan"
          :rowspan="th.rowspan"
          :style="{ 'min-width': th.width + 'px' }"
        >
          {{ th.name }}
        </th>
      </tr>
      <tr>
        <th v-for="(card, cardIdx) in specCard" :key="cardIdx">
          {{ card.name }}
        </th>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr v-for="(item, index) in tableData" :key="index">
        <td v-for="(spec, specIdx) in item.specs" :key="specIdx" scope="row">
          {{ spec.name }}
        </td>
        <td class="d-flex justify-content-center">
          <el-button
            v-if="!item.image"
            icon="el-icon-plus"
            circle
            @click="chooseImage(item)"
          ></el-button>
          <img
            v-else
            :src="item.image"
            style="width: 40px; cursor: pointer;"
            class="rounded"
            @click="chooseImage(item)"
          />
        </td>
        <td>
          <el-input v-model="item.sPrice" type="number" min="0"></el-input>
        </td>
        <td>
          <el-input v-model="item.mPrice" type="number" min="0"></el-input>
        </td>
        <td>
          <el-input v-model="item.cPrice" type="number" min="0"></el-input>
        </td>
        <td>
          <el-input v-model="item.stock" type="number" min="0"></el-input>
        </td>
        <td>
          <el-input v-model="item.volume" type="number" min="0"></el-input>
        </td>
        <td>
          <el-input v-model="item.weight" type="number" min="0"></el-input>
        </td>
        <td><el-input v-model="item.code"></el-input></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SpecTable',
  inject: ['app'],
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['getThead', 'getTbody', 'multipleSpecCard']),
    specCard() {
      return this.multipleSpecCard.filter((v) => v.list.length > 0)
    }
  },
  watch: {
    getTbody(newVal, oldVal) {
      this.tableData = newVal
    }
  },
  created() {
    this.tableData = this.getTbody
  },
  methods: {
    chooseImage(obj) {
      this.app.chooseImage((res) => {
        obj.image = res[0].url
      }, 1)
    }
  }
}
</script>

<style scoped></style>
