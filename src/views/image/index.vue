<template>
  <div>
    <el-container
      class="position-absolute"
      style="top: 55px;left: 0;right: 0;bottom: 0"
    >
      <image-header
        ref="imageHeader"
        :chooseList="chooseList"
        @create="openAlbumModel"
      ></image-header>
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
              @update="openAlbumModel"
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
                v-for="(image, index) in getCurPageImage"
                :key="index"
                :index="index"
                :image="image"
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
            <el-button
              size="mini"
              icon="el-icon-arrow-left"
              :disabled="albumPage === 1"
              >上一页</el-button
            >
            <el-button size="mini"
              >下一页<i class="el-icon-arrow-right el-icon--right"></i
            ></el-button>
          </el-button-group>
        </div>
        <div class="text-center flex-fill">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
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
      @close="closeAlbumModel"
    >
      <el-form :model="albumForm" :rules="formRules" label-width="80px">
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
        <el-button @click="closeAlbumModel">取 消</el-button>
        <el-button
          type="primary"
          :disabled="albumForm.name === ''"
          @click="confirmAlbumModel"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import albumItem from '@/components/image/album-item'
import imageItem from '@/components/image/image-item'
import imageHeader from '@/components/image/image-header'
import { mapState } from 'vuex'
export default {
  name: 'Photo',
  provide() {
    return {
      $image: this,
    }
  },
  components: {
    albumItem,
    imageItem,
    imageHeader,
  },
  data() {
    return {
      albumForm: {
        id: 0,
        name: '',
        order: 0,
        imagesCount: 0,
        imageList: [],
      },
      formRules: {
        name: [
          { required: true, message: '相册名称不能为空', trigger: 'blur' },
        ],
      },
      albumPage: 1,
      albumIndex: 0,
      albumModel: false,
      albumEditIndex: -1,
      chooseList: [],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      total: 0,
      imageList: [],
    }
  },
  computed: {
    ...mapState({
      albumList: (state) => state.image.albumList,
    }),
    albumModelTitle() {
      return this.albumEditIndex > -1 ? '修改相册' : '创建相册'
    },
    getCurPageImage() {
      let curAlbumImage = []
      let totalPage = Math.ceil(this.imageList.length / this.pageSize)
      for (let index = 0; index < totalPage; index++) {
        curAlbumImage[index] = this.imageList.slice(
          this.pageSize * index,
          this.pageSize * (index + 1),
        )
      }
      let imageShow = curAlbumImage[this.currentPage - 1]
      return imageShow
    },
  },
  created() {
    this.__init()
  },
  methods: {
    // 页面数据初始化
    __init() {
      this.$store.dispatch('image/getAlbums').then(async (res) => {
        let { albumList } = res
        this.total = albumList[0].imagesCount
        let { imageList } = await this.$store.dispatch(
          'image/getImages',
          albumList[0].id,
        )
        this.imageList = imageList
      })
    },
    // 编辑相册
    updateAlbum() {
      const bol =
        this.albumList[this.albumEditIndex].name === this.albumForm.name &&
        this.albumList[this.albumEditIndex].order === this.albumForm.order
      if (!bol) {
        this.albumList[this.albumEditIndex] = { ...this.albumForm }
        this.$message({
          message: '修改成功',
          type: 'success',
        })
      }
      this.closeAlbumModel()
    },
    // 打开模态框
    openAlbumModel(obj) {
      // 修改
      if (obj) {
        const { album, index } = obj
        this.albumForm = { ...album }
        this.albumEditIndex = index
        return (this.albumModel = true)
      }
      // 创建
      this.albumForm = {
        id: this.albumList.length + 1,
        name: '',
        order: 50,
        imagesCount: 0,
      }
      this.albumEditIndex = -1
      this.albumModel = true
    },
    confirmAlbumModel() {
      if (this.albumForm.name !== '') {
        // 判断是否为修改
        if (this.albumEditIndex > -1) {
          return this.updateAlbum()
        }
        this.albumList.unshift({ ...this.albumForm })
        this.closeAlbumModel()
      }
    },
    closeAlbumModel() {
      this.albumForm = {
        id: 0,
        name: '',
        order: 0,
        imagesCount: 0,
        imageList: [],
      }
      this.albumModel = false
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
  },
}
</script>

<style scoped></style>
