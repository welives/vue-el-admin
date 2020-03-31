<template>
  <div class="bg-white mt-2">
    <div class="border-bottom py-2">
      <el-button type="primary" size="mini" @click="appendCate(false)"
        >新增顶级分类</el-button
      >
    </div>
    <el-tree
      :data="category"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      draggable
      @node-drop="nodeDrop"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <div>
          <span>{{ node.label }}</span>
        </div>
        <span>
          <el-button
            :type="data.status ? 'primary' : 'info'"
            size="mini"
            plain
            @click.stop="updateStatus(data)"
          >
            {{ data.status ? '显示' : '隐藏' }}
          </el-button>
          <el-button
            type="success"
            size="mini"
            plain
            @click.stop="appendCate(data)"
          >
            增加
          </el-button>
          <el-button
            type="warning"
            size="mini"
            plain
            @click.stop="updateName(data)"
          >
            修改
          </el-button>
          <el-popconfirm
            style="margin-left: 10px;"
            title="是否删除该分类和其子分类？"
            @onConfirm="removeCate(data)"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              plain
              @click.stop="$emit('onConfirm')"
              v-auth
              >删除</el-button
            >
          </el-popconfirm>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Category',
  inject: ['$layout'],
  data() {
    return {
      defaultProps: {
        children: 'child',
        label: 'name',
      },
      count: 100,
    }
  },
  created() {
    this.__init()
  },
  computed: {
    ...mapState({
      category: (state) => state.category.category,
    }),
  },
  methods: {
    // 初始化数据
    __init() {
      this.$layout.showLoading()
      this.$store.dispatch('category/getCategory')
      this.$layout.hideLoading()
    },
    // 显示或隐藏
    updateStatus(data) {
      this.$store.commit('category/UPDATE_status', {
        id: data.id,
        key: 'status',
        value: !data.status,
      })
    },
    // 添加节点
    appendCate(data) {
      const title = data ? '新增子分类' : '新增顶级分类'
      this.$prompt('请输入分类名称', title, {
        inputValue: '',
        inputValidator(value) {
          if (value === '') {
            return '分类名称不能为空'
          }
        },
      })
        .then(({ value }) => {
          const newCate = {
            id: this.count++,
            name: value.trim(),
            status: true,
            category_id: data ? data.id : 0,
            child: [],
          }
          // 新增顶级分类,传过来的data=false
          if (!data) {
            this.$store.commit('category/APPEND_top', newCate)
          } else {
            this.$store.commit('category/APPEND_child', {
              id: data.id,
              key: 'child',
              value: newCate,
            })
          }
        })
        .catch(() => {})
    },
    updateName(data) {
      this.$prompt('请输入分类名称', '修改分类', {
        inputValue: data.name,
        inputValidator(value) {
          if (value === '') {
            return '分类名称不能为空'
          }
        },
      })
        .then(({ value }) => {
          this.$store.commit('category/UPDATE_name', {
            id: data.id,
            key: 'name',
            value: value.trim(),
          })
        })
        .catch(() => {})
    },
    // 删除节点
    removeCate(data) {
      this.$store.commit('category/DELETE_category', data)
    },
    // 拖拽成功完成时
    nodeDrop(...options) {
      // 被拖拽的节点
      let target = options[0].data
      // 结束拖拽时最后进入的节点
      let located = options[1].data
      if (located) {
        if (options[2] === 'before' || options[2] === 'after') {
          target.category_id = located.category_id
        } else {
          target.category_id = located.id
        }
      }
      this.$store.commit('category/SET_category', this.category)
    },
  },
}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
/* .el-tree-node__content {
  margin: 5px 0;
} */
</style>
