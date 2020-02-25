<template>
  <div>
    <!-- 数据统计 -->
    <el-row :gutter="20">
      <el-col v-for="(item, index) in counts" :key="index" :span="6">
        <el-card shadow="hover">
          <div class="d-flex align-items-center">
            <i
              :class="[item.icon, item.color]"
              class="h3 mb-0 bg-primary text-white text-center mr-3"
              style="width: 40px;height: 40px;line-height: 40px;"
            ></i>
            <div>
              <h3 class="mb-1">{{ item.num }}</h3>
              <small class="text-muted">{{ item.desc }}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="my-3">
      <el-col
        :span="12"
        style="height: 370px"
        class="d-flex flex-column justify-content-between"
      >
        <!-- 店铺和订单提示 -->
        <el-card v-for="(item, index) in tips" :key="index" shadow="never">
          <div slot="header">
            <span>{{ item.title }}</span>
            <small class="text-muted float-right">{{ item.desc }}</small>
          </div>
          <div class="row">
            <div
              v-for="(list, idx) in item.list"
              :key="idx"
              :class="'col-' + 12 / item.list.length"
            >
              <button class="btn btn-light w-100">
                <h4 class="mb-1">{{ list.value }}</h4>
                <small class="text-muted">{{ list.name }}</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 统计图 -->
      <el-col :span="12">
        <el-card style="height: 370px" shadow="never">
          <div slot="header">
            <span>订单总数统计</span>
            <small class="text-muted float-right">订单数量</small>
          </div>
          <!-- 统计图容器 -->
          <div ref="myChart" class="w-100" style="height: 270px"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-3">
      <!-- 销售情况统计 -->
      <el-col :span="12">
        <el-card shadow="never">
          <div slot="header">
            <span>销售情况统计</span>
            <small class="text-muted float-right"
              >按周期统计商家店铺的订单量和订单金额</small
            >
          </div>
          <div class="media align-items-center border">
            <span class="py-4 px-3 bg-light border-right">昨日销量</span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-1 mb-1">
                <span>订单量(件)</span>12
              </div>
              <div class="pl-3"><span>订单金额(件)</span>12</div>
            </div>
          </div>
          <div class="media align-items-center border mt-3">
            <span class="py-4 px-3 bg-light border-right">本月销量</span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-1 mb-1">
                <span>订单量(件)</span>12
              </div>
              <div class="pl-3"><span>订单金额(件)</span>12</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 单品销售排名 -->
      <el-col :span="12">
        <el-card shadow="never">
          <div slot="header">
            <span>单品销售排名</span>
            <small class="text-muted float-right"
              >按周期统计商家店铺的订单量和订单金额</small
            >
          </div>
          <el-table :data="tableData" height="200" border style="width: 100%">
            <el-table-column
              type="index"
              label="#"
              width="50"
            ></el-table-column>
            <el-table-column prop="name" label="商品信息"></el-table-column>
            <el-table-column
              prop="num"
              label="销量"
              width="70"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [
        { name: '小天鹅滚筒洗衣机...', num: 9 },
        { name: '小天鹅滚筒洗衣机...', num: 9 },
        { name: '小天鹅滚筒洗衣机...', num: 9 },
        { name: '小天鹅滚筒洗衣机...', num: 9 }
      ],
      counts: [
        {
          icon: 'el-icon-user-solid',
          color: 'bg-primary',
          num: 30,
          desc: '关注人数'
        },
        {
          icon: 'el-icon-s-finance',
          color: 'bg-success',
          num: 120,
          desc: '订单总数'
        },
        {
          icon: 'el-icon-user-solid',
          color: 'bg-warning',
          num: 4183.8,
          desc: '今日订单总金额'
        },
        {
          icon: 'el-icon-user-solid',
          color: 'bg-danger',
          num: 100,
          desc: '本月销量'
        }
      ],
      tips: [
        {
          title: '店铺及商品提示',
          desc: '需要关注的店铺信息及待办事项',
          list: [
            { name: '出售中', value: 64 },
            { name: '出售中', value: 64 },
            { name: '出售中', value: 64 },
            { name: '出售中', value: 64 }
          ]
        },
        {
          title: '交易提示',
          desc: '需要立即处理的交易订单',
          list: [
            { name: '待付款', value: 0 },
            { name: '待发货', value: 10 },
            { name: '已发货', value: 0 },
            { name: '已收货', value: 3 },
            { name: '退款中', value: 3 },
            { name: '待售后', value: 3 }
          ]
        }
      ],
      sales: [
        { title: '销售情况统计', desc: '按周期统计商家店铺的订单量和订单金额' }
      ]
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      const myChart = echarts.init(this.$refs.myChart)
      const option = {
        title: {
          // text: '堆叠区域图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped></style>
