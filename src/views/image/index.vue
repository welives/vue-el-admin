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
              v-for="(album, index) in getCurPageAlbum"
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
              :disabled="albumPage === 1 || albumList.length === 0"
              @click="prevAlbum"
              >上一页</el-button
            >
            <el-button
              size="mini"
              @click="nextAlbum"
              :disabled="albumPage === Math.ceil(albumList.length / albumSize)"
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
  name: 'ImageManager',
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
      imageList: [],
      chooseList: [],
      searchList: [],
      // 相册表单数据
      albumModel: false,
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
      albumIndex: 0,
      albumEditIndex: -1,
      albumPage: 1,
      albumSize: 5,
      // 图片分页相关数据
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      total: 0,
      keyword: '',
    }
  },
  watch: {
    keyword(value) {
      this.getCurPageImage = value
    },
  },
  computed: {
    ...mapState({
      albumList: (state) => state.image.albumList,
    }),
    albumModelTitle() {
      return this.albumEditIndex > -1 ? '修改相册' : '创建相册'
    },
    // 图片分页处理和搜索结果
    getCurPageImage: {
      get() {
        const curAlbumImage = []
        let imageList =
          this.searchList.length || this.keyword
            ? this.searchList
            : this.imageList
        const totalPage = Math.ceil(imageList.length / this.pageSize)
        for (let index = 0; index < totalPage; index++) {
          curAlbumImage[index] = imageList.slice(
            this.pageSize * index,
            this.pageSize * (index + 1),
          )
        }
        const imageShow = curAlbumImage[this.currentPage - 1]
        return imageShow
      },
      set(value) {
        let imageList = this.imageList
        let str = value.trim().toLowerCase()
        if (str) {
          imageList = imageList.filter((v) => {
            if (v.name.toLowerCase().indexOf(str) !== -1) {
              return v
            }
          })
        }
        this.currentPage = 1
        this.searchList = imageList.length ? imageList : []
        this.total = imageList.length
      },
    },
    // 相册分页处理
    getCurPageAlbum() {
      const curAlbum = []
      const totalPage = Math.ceil(this.albumList.length / this.albumSize)
      for (let index = 0; index < totalPage; index++) {
        curAlbum[index] = this.albumList.slice(
          this.albumSize * index,
          this.albumSize * (index + 1),
        )
      }
      const albumShow = curAlbum[this.albumPage - 1]
      return albumShow
    },
  },
  created() {
    this.__init()
  },
  methods: {
    // 页面数据初始化
    __init() {
      this.$store.dispatch('image/getAlbums').then(async (res) => {
        const { imageList } = await this.$store.dispatch(
          'image/getImages',
          this.albumList[0].id,
        )
        this.total = this.albumList[0].imagesCount
        this.imageList = imageList
      })
    },
    // 编辑相册
    updateAlbum() {
      const bol =
        this.getCurPageAlbum[this.albumEditIndex].name !==
          this.albumForm.name ||
        this.getCurPageAlbum[this.albumEditIndex].order !== this.albumForm.order
      // 相册名或排序有更改的情况下才执行
      if (bol) {
        let id = this.albumForm.id
        this.$store.commit('image/UPDATE_albumList', {
          id,
          value: this.albumForm,
        })
        this.$message({
          message: '修改成功',
          type: 'success',
        })
      }
      this.closeAlbumModel()
    },
    // 打开模态框
    openAlbumModel(obj) {
      // 修改相册
      if (obj) {
        const { album, index } = obj
        this.albumForm = { ...album }
        this.albumEditIndex = index
        return (this.albumModel = true)
      }
      // 创建相册
      this.albumForm = {
        id: this.albumList.length + 1,
        name: '',
        order: 50,
        imagesCount: 0,
        imageList: [],
      }
      this.albumEditIndex = -1
      this.albumModel = true
    },
    // 确认模态框数据
    confirmAlbumModel() {
      if (this.albumForm.name !== '') {
        // 判断是否为修改
        if (this.albumEditIndex > -1) {
          return this.updateAlbum()
        }
        // 创建相册
        this.albumList.unshift({ ...this.albumForm })
        this.$store
          .dispatch('image/getImages', this.albumForm.id)
          .then(async (response) => {
            const { imageList } = response
            this.albumList[0].imageList = imageList
            this.albumList[0].imagesCount = imageList.length
            await this.$store.commit('image/SET_albumList', this.albumList)
          })
        this.albumIndex++
        if (this.albumIndex === this.getCurPageAlbum.length) {
          this.nextAlbum()
        }
      }
      this.closeAlbumModel()
    },
    // 关闭模态框
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
    // 获取图片列表
    getImageList() {
      // 如果当前相册的图片列表为空,则发起请求
      if (this.getCurPageAlbum[this.albumIndex].imageList.length === 0) {
        this.$store
          .dispatch('image/getImages', this.getCurPageAlbum[this.albumIndex].id)
          .then((response) => {
            const { imageList } = response
            this.imageList = imageList
            this.total = imageList.length
          })
      } else {
        // 否则从vuex获取数据
        this.imageList = this.getCurPageAlbum[this.albumIndex].imageList
        this.total = this.imageList.length
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    prevAlbum() {
      this.albumPage--
      this.albumIndex = 0
      this.currentPage = 1
      this.getImageList()
      this.$refs.imageHeader.unChoose()
    },
    nextAlbum() {
      this.albumPage++
      this.albumIndex = 0
      this.currentPage = 1
      this.getImageList()
      this.$refs.imageHeader.unChoose()
    },
  },
}
</script>

<style scoped></style>
