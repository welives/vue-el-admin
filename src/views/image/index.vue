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
        <!-- 相册分页 -->
        <el-aside width="200px" class="border-right album-pagination">
          <el-pagination
            layout="prev, next"
            :page-size="album.size"
            :total="album.total"
            class="d-flex align-items-center justify-content-center"
            @current-change="albumPageChange"
          >
          </el-pagination>
        </el-aside>
        <!-- 图片分页 -->
        <div class="text-center flex-fill">
          <el-pagination
            :current-page="page.current"
            :page-sizes="page.sizes"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            @size-change="pageSizeChange"
            @current-change="curPageChange"
          ></el-pagination>
        </div>
      </el-footer>
    </el-container>
    <!-- 创建 | 修改相册 -->
    <el-dialog
      :title="albumEditIndex > -1 ? '修改相册' : '创建相册'"
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
        <el-button @click="albumModel = false">取 消</el-button>
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
import common from '@/common/mixins/common.js'
import { mapState } from 'vuex'
export default {
  name: 'ImageManager',
  inject: ['$layout'],
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
  mixins: [common],
  data() {
    return {
      imageList: [],
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
    // 图片分页处理和搜索结果
    getCurPageImage: {
      get() {
        const curData = []
        // 如果有搜索结果或输入框有值,则取searchList的值,否则取imageList的值
        const dataList =
          this.searchList.length || this.keyword
            ? this.searchList
            : this.imageList
        const totalPage = Math.ceil(dataList.length / this.page.size)
        for (let index = 0; index < totalPage; index++) {
          curData[index] = dataList.slice(
            this.page.size * index,
            this.page.size * (index + 1),
          )
        }
        return curData[this.page.current - 1]
      },
      set(value) {
        let searchList = this.imageList
        const str = value.trim()
        if (str) {
          searchList = searchList.filter((v) => {
            if (v.name.indexOf(str) !== -1) {
              return v
            }
          })
        }
        // 如果搜索结果有值,则取searchList的值,否则为空数组
        this.searchList = searchList.length ? searchList : []
        if (this.searchList.length === this.imageList.length) {
          this.searchList = []
        }
        this.page.current = 1
        this.page.total = searchList.length
        this.unChoose()
      },
    },
    // 相册分页处理
    getCurPageAlbum() {
      const albumShow = []
      const totalPage = Math.ceil(this.albumList.length / this.album.size)
      for (let index = 0; index < totalPage; index++) {
        albumShow[index] = this.albumList.slice(
          this.album.size * index,
          this.album.size * (index + 1),
        )
      }
      return albumShow[this.album.current - 1]
    },
  },
  created() {
    this.__init()
  },
  methods: {
    // 页面数据初始化
    __init() {
      this.$layout.showLoading()
      // vuex中没有数据
      if (!this.albumList.length) {
        this.$store.dispatch('image/getAlbums').then(async (res) => {
          this.album.total = this.albumList.length
          const { imageList } = await this.$store.dispatch(
            'image/getImages',
            this.albumList[0].id,
          )
          this.imageList = imageList
          this.page.total = imageList.length
        })
      } else {
        // vuex中有数据
        this.album.total = this.albumList.length
        this.imageList = this.albumList[0].imageList
        this.page.total = this.imageList.length
      }
      this.$layout.hideLoading()
    },
    // 编辑相册
    updateAlbum() {
      const curAlbum = this.getCurPageAlbum[this.albumEditIndex]
      const bol =
        curAlbum.name !== this.albumForm.name ||
        curAlbum.order !== this.albumForm.order
      // 相册名或排序有更改的情况下才执行
      if (bol) {
        this.$store.commit('image/UPDATE_albumList', {
          id: this.albumForm.id,
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
          .then((response) => {
            const { imageList } = response
            this.albumList[0].imageList = imageList
            this.albumList[0].imagesCount = imageList.length
            this.$store.commit('image/SET_albumList', this.albumList)
          })
        this.albumIndex++
        this.album.total = this.albumList.length
        if (this.albumIndex === this.getCurPageAlbum.length) {
          this.albumPageChange(++this.album.current)
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
      this.$layout.showLoading()
      const curAlbum = this.getCurPageAlbum[this.albumIndex]
      // 如果当前相册的图片列表为空,则发起请求
      if (curAlbum.imageList.length === 0) {
        this.$store
          .dispatch('image/getImages', curAlbum.id)
          .then((response) => {
            const { imageList } = response
            this.imageList = imageList
            this.page.total = imageList.length
          })
      } else {
        // 否则从vuex获取数据
        this.imageList = curAlbum.imageList
        this.page.total = this.imageList.length
      }
      this.$layout.hideLoading()
    },
    // 切换相册页码
    albumPageChange(val) {
      this.keyword = ''
      this.album.current = val
      this.albumIndex = 0
      this.page.current = 1
      this.getImageList()
      this.unChoose()
    },
    unChoose() {
      this.imageList.forEach((img) => (img.isCheck = false))
      this.chooseList = []
    },
  },
}
</script>

<style lang="scss">
.album-pagination {
  height: 60px;
  .el-pagination {
    height: 100%;
    .btn-prev {
      padding-right: 20px;
      .el-icon {
        font-size: 20px;
      }
    }
    .btn-next {
      padding-left: 20px;
      .el-icon {
        font-size: 20px;
      }
    }
  }
}
</style>
