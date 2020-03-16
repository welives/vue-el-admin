<template>
  <div>
    <el-container
      class="position-absolute"
      style="top: 55px;left: 0;right: 0;bottom: 0"
    >
      <el-header class="d-flex align-items-center border-bottom">
        <div class="d-flex mr-auto">
          <el-select
            v-model="searchForm.order"
            placeholder="请选择图片排序方式"
            size="small"
          >
            <el-option label="区域一" value="北京"></el-option>
            <el-option label="区域二" value="上海"></el-option>
          </el-select>
          <el-input
            v-model="searchForm.keyword"
            placeholder="输入相册名称"
            size="small"
            class="mx-2"
          ></el-input>
          <el-button type="primary" size="small">搜索</el-button>
        </div>
        <el-button type="success" size="small" @click="openAlbumModel(false)"
          >创建相册</el-button
        >
        <el-button type="primary" size="small" @click="uploadModel = true"
          >上传图片 <i class="el-icon-upload"></i
        ></el-button>
        <el-button
          v-if="chooseList.length"
          type="warning"
          size="small"
          @click="unChoose"
          >取消选中</el-button
        >
        <el-button
          v-if="chooseList.length"
          type="danger"
          size="small"
          @click="delImages"
          >批量删除</el-button
        >
      </el-header>
      <el-container>
        <el-aside
          width="200px"
          style="top: 60px; bottom: 60px"
          class="bg-white border-right position-absolute"
        >
          <!-- 相册列表 -->
          <ul class="list-group list-group-flush">
            <album-item
              v-for="(album, index) in albumList"
              :key="index"
              :album="album"
              :index="index"
              :active="albumIndex === index"
              @choose="chooseAlbum"
              @update="openAlbumModel"
              @del="delAlbum"
            ></album-item>
          </ul>
        </el-aside>
        <el-container
          class="position-absolute"
          style="top: 60px; left: 200px; right: 0; bottom: 60px"
        >
          <el-main>
            <!-- 图片列表 -->
            <el-row :gutter="15">
              <image-item
                v-for="(image, index) in imageList"
                :key="index"
                :index="index"
                :image="image"
                @choose="chooseImage"
                @view="previewImage"
                @update="updateImage"
                @del="delImage"
              ></image-item>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <el-footer class="border-top d-flex align-items-center px-0">
        <div
          style="width: 200px;"
          class="h-100 d-flex align-items-center justify-content-center border-right flex-shrink-0"
        >
          <el-button-group>
            <el-button size="mini" icon="el-icon-arrow-left">上一页</el-button>
            <el-button size="mini"
              >下一页<i class="el-icon-arrow-right el-icon--right"></i
            ></el-button>
          </el-button-group>
        </div>
        <div class="text-center flex-fill">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </el-footer>
    </el-container>
    <!-- 创建 | 修改相册 -->
    <el-dialog
      :title="albumModelTitle"
      :visible.sync="albumModel"
      :destroy-on-close="true"
    >
      <el-form :model="albumForm" :rules="albumRules" label-width="80px">
        <el-form-item label="相册名称" prop="name">
          <el-input
            v-model="albumForm.name"
            size="medium"
            placeholder="请输入相册名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number
            v-model="albumForm.order"
            :min="0"
            size="medium"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="albumModel = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="albumForm.name === ''"
          @click="confirmAlbumModel"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 上传图片 -->
    <el-dialog
      title="上传图片"
      :visible.sync="uploadModel"
      :destroy-on-close="true"
    >
      <div class="text-center">
        <el-upload
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </el-dialog>
    <!-- 图片预览 -->
    <el-dialog
      :visible.sync="previewModel"
      width="70vw"
      top="5vh"
      :show-close="false"
      :destroy-on-close="true"
    >
      <div style="margin: -60px -20px -30px">
        <img :src="previewUrl" class="w-100" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import albumItem from '@/components/image/album-item'
import imageItem from '@/components/image/image-item'
export default {
  name: 'Photo',
  components: {
    albumItem,
    imageItem,
  },
  data() {
    return {
      searchForm: {
        order: '',
        keyword: '',
      },
      albumList: [],
      albumIndex: 0,
      albumModel: false,
      uploadModel: false,
      albumEditIndex: -1,
      albumForm: {
        name: '',
        order: 0,
      },
      albumRules: {
        name: [
          { required: true, message: '相册名称不能为空', trigger: 'blur' },
        ],
      },
      previewModel: false,
      previewUrl: '',
      imageList: [],
      chooseList: [],
      currentPage: 1,
    }
  },
  computed: {
    albumModelTitle() {
      return this.albumEditIndex > -1 ? '修改相册' : '创建相册'
    },
  },
  created() {
    this.__init()
  },
  methods: {
    // 页面数据初始化
    __init() {
      for (let i = 0; i < 20; i++) {
        this.albumList.push({
          name: '相册' + i,
          num: Math.floor(Math.random() * 20),
          order: 0,
        })
      }
      for (let i = 0; i < 20; i++) {
        this.imageList.push({
          name: '图片' + i,
          url:
            'http://ww1.sinaimg.cn/large/00745YaMgy1gbayr1pl2kj30xc0m7ng0.jpg',
          isCheck: false,
        })
      }
    },
    // 选择相册
    chooseAlbum(index) {
      if (this.albumIndex === index) return
      this.unChoose()
      this.albumIndex = index
    },
    // 编辑相册
    updateAlbum() {
      const bol =
        this.albumList[this.albumEditIndex].name === this.albumForm.name &&
        this.albumList[this.albumEditIndex].order === this.albumForm.order
      if (!bol) {
        this.albumList[this.albumEditIndex].name = this.albumForm.name
        this.albumList[this.albumEditIndex].order = this.albumForm.order
        this.$message({
          message: '修改成功',
          type: 'success',
        })
      }
    },
    // 删除相册
    delAlbum(index) {
      this.$confirm('是否删除该相册?', {
        type: 'warning',
      })
        .then(() => {
          this.albumList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {})
    },
    // 打开模态框
    openAlbumModel(obj) {
      // 修改
      if (obj) {
        const { album, index } = obj
        this.albumForm.name = album.name
        this.albumForm.order = album.order
        this.albumEditIndex = index
        return (this.albumModel = true)
      }
      // 创建
      this.albumForm = {
        name: '',
        order: 0,
      }
      this.albumEditIndex = -1
      this.albumModel = true
    },
    confirmAlbumModel() {
      if (this.albumForm.name !== '') {
        // 判断是否为修改
        if (this.albumEditIndex > -1) {
          this.updateAlbum()
          return (this.albumModel = false)
        }
        this.albumList.unshift({
          name: this.albumForm.name,
          num: 0,
          order: this.albumForm.order,
        })
        this.albumModel = false
      }
    },
    // 图片预览
    previewImage(image) {
      this.previewUrl = image.url
      this.previewModel = true
    },
    // 图片编辑
    updateImage(image) {
      this.$prompt('', '请输入图片名称', {
        inputPlaceholder: '请输入图片名称',
        inputValue: image.name,
        inputValidator(value) {
          if (value === '') {
            return '图片名称不能为空'
          }
        },
      })
        .then(({ value }) => {
          image.name = value
          this.$message({
            message: '修改成功',
            type: 'success',
          })
        })
        .catch(() => {})
    },
    // 删除单张图片
    delImage(index) {
      this.imageList.splice(index, 1)
    },
    // 批量删除图片
    delImages() {
      this.$confirm('是否删除选中的图片?', {
        type: 'warning',
      })
        .then(() => {
          const list = this.imageList.filter((img, index) => {
            return !this.chooseList.some((c) => c.id === index)
          })
          this.imageList = list
          this.chooseList = []
        })
        .catch(() => {})
    },
    // 选择图片
    chooseImage(obj) {
      const { image, index } = obj
      if (!image.isCheck) {
        this.chooseList.push({ id: index, url: image.url })
        image.isCheck = true
        return
      }
      const i = this.chooseList.findIndex((v) => v.id === index)
      if (i === -1) return
      image.isCheck = false
      this.chooseList.splice(i, 1)
    },
    // 取消选中的图片
    unChoose() {
      this.chooseList = []
      this.imageList.forEach((img) => (img.isCheck = false))
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
  },
}
</script>

<style scoped></style>
