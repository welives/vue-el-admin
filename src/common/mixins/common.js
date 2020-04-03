import { get, set } from '@/utils/auth'
export default {
  filters: {
    // 格式化规格值
    formatSpecValue(value) {
      const arr = value.map((v) => v.name)
      return arr.join(',')
    },
  },
  data() {
    return {
      tabIndex: 0,
      page: {
        current: 1,
        sizes: [10, 20, 50],
        size: 10,
        total: 0,
      },
      album: {
        current: 1,
        size: 5,
        total: 0,
      },
      keyword: '',
      chooseList: [],
      searchList: [],
      isAdvancedSearch: false,
    }
  },
  computed: {
    // 表格分页
    getCurPageData() {
      const curData = []
      const totalPage = Math.ceil(this.dataList.length / this.page.size)
      for (let i = 0; i < totalPage; i++) {
        curData[i] = this.dataList.slice(
          this.page.size * i,
          this.page.size * (i + 1),
        )
      }
      return curData[this.page.current - 1]
    },
  },
  watch: {
    $route() {
      this.__initNavbar()
      this.getBreadcrumb()
      set('tab', JSON.stringify({ tab: 0 }))
    },
    tabIndex() {
      set('tab', JSON.stringify({ tab: this.tabIndex }))
    },
  },
  methods: {
    // 初始化导航栏
    __initNavbar() {
      this.navBar.list.some((nav, navI) => {
        const res = nav.sideMenu.some((v, sideI) => {
          if (v.name === this.$route.name) {
            this.navBar.active = navI
            this.sideMenuActive = sideI
            this.$store.commit('menu/SET_navbar', {
              key: 'active',
              value: navI,
            })
            this.$store.commit('menu/SET_sideActive', sideI)
            return true
          }
        })
        if (res) return true
      })
    },
    // 初始化tab菜单
    __initTabBar() {
      const tab = JSON.parse(get('tab'))
      if (tab) {
        this.tabIndex = tab.tab
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.getCurPageData = ''
    },
    // 高级搜索
    advancedSearch() {
      this.getCurPageData = this.search
      this.isAdvancedSearch = true
    },
    // 更新状态
    statusChange(mutations, data) {
      this.$store.commit(mutations, data)
    },
    // 删除单个
    deleteItem(mutations, data) {
      const index = this.dataList.findIndex((v) => v.id === data.row.id)
      this.$store.commit(mutations, index)
      this.deleteSearchHandle(data)
    },
    // 批量删除
    deleteAll(mutations) {
      const list = this.dataList.filter((data) => {
        return !this.chooseList.some((c) => c.id === data.id)
      })
      this.$store.commit(mutations, list)
      this.deleteSearchHandle()
      this.chooseList = []
    },
    deleteSearchHandle(data = false) {
      if (this.searchList.length) {
        if (!data) {
          this.searchList = this.searchList.filter((s) => {
            return !this.chooseList.some((c) => c.id === s.id)
          })
        } else {
          this.searchList = this.searchList.filter((s) => s.id !== data.row.id)
        }
      }
      const dataList =
        this.searchList.length || this.keyword || this.isAdvancedSearch
          ? this.searchList
          : this.dataList
      if (!this.getCurPageData) {
        const totalPage = Math.ceil(dataList.length / this.page.size)
        if (totalPage < this.page.current) {
          this.page.current--
        }
      }
      this.page.total = dataList.length
    },
    // 选择表格数据
    chooseData(val) {
      this.chooseList = val
    },
    // 切换每页显示条数
    pageSizeChange(val) {
      this.page.size = val
    },
    // 改变页数
    curPageChange(val) {
      this.page.current = val
    },
  },
}
