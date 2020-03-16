<template>
  <div class="bg-white mt-2">
    <div class="border-bottom py-2">
      <el-button type="primary" size="mini" @click="append(false)"
        >新增分类</el-button
      >
    </div>
    <el-tree
      :data="treeData"
      default-expand-all
      :expand-on-click-node="false"
      draggable
      @node-click="handleNodeClick"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <div>
          <el-input
            v-if="data.editStatus"
            v-model="data.label"
            placeholder=""
            size="mini"
          ></el-input>
          <span v-else>{{ node.label }}</span>
        </div>
        <span>
          <el-button
            :type="data.status ? 'primary' : 'danger'"
            size="mini"
            plain
            @click.stop="data.status = !data.status"
          >
            {{ data.status ? '显示' : '隐藏' }}
          </el-button>
          <el-button
            type="success"
            size="mini"
            plain
            @click.stop="append(data)"
          >
            增加
          </el-button>
          <el-button
            :type="data.editStatus ? 'default' : 'warning'"
            size="mini"
            plain
            @click.stop="data.editStatus = !data.editStatus"
          >
            {{ data.editStatus ? '完成' : '修改' }}
          </el-button>
          <el-popconfirm
            style="margin-left: 10px;"
            title="是否删除该分类和其子分类？"
            @onConfirm="remove(node, data)"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              plain
              @click.stop="$emit('onConfirm')"
              >删除</el-button
            >
          </el-popconfirm>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: '一级 1',
          status: true,
          editStatus: false,
          children: [
            {
              id: 2,
              label: '二级 1-1',
              status: true,
              editStatus: false,
              children: [
                {
                  id: 3,
                  label: '三级 1-1-1',
                  status: true,
                  editStatus: false,
                },
              ],
            },
          ],
        },
        {
          id: 4,
          label: '一级 2',
          status: true,
          editStatus: false,
          children: [
            {
              id: 5,
              label: '二级 2-1',
              status: true,
              editStatus: false,
              children: [
                {
                  id: 6,
                  label: '三级 2-1-1',
                  status: true,
                  editStatus: false,
                },
              ],
            },
            {
              id: 7,
              label: '二级 2-2',
              status: true,
              editStatus: false,
              children: [
                {
                  id: 8,
                  label: '三级 2-2-1',
                  status: true,
                  editStatus: false,
                },
              ],
            },
          ],
        },
        {
          id: 9,
          label: '一级 3',
          status: true,
          editStatus: false,
          children: [
            {
              id: 10,
              label: '二级 3-1',
              status: true,
              editStatus: false,
              children: [
                {
                  id: 11,
                  label: '三级 3-1-1',
                  status: true,
                  editStatus: false,
                },
              ],
            },
            {
              id: 12,
              label: '二级 3-2',
              status: true,
              editStatus: false,
              children: [
                {
                  id: 13,
                  label: '三级 3-2-1',
                  status: true,
                  editStatus: false,
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      count: 100,
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    append(data) {
      this.$prompt('请输入分类名称', '新增分类', {
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
            label: value,
            status: true,
            editStatus: false,
            children: [],
          }
          // 新增顶级分类
          if (!data) {
            this.treeData.push(newCate)
          } else {
            // 新增子分类
            if (!data.children) {
              this.$set(data, 'children', [])
            }
            data.children.push(newCate)
          }
        })
        .catch(() => {})
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((v) => v.id === data.id)
      children.splice(index, 1)
    },
  },
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-tree-node__content {
  margin: 5px 0;
}
</style>
