import { get, set } from '@/utils/auth'
export default {
  data() {
    return {
      page: {
        current: 1,
        sizes: [10, 20, 50],
        size: 10,
        total: 0,
      },
      chooseList: [],
    }
  },
  computed: {
    // 表格分页
    getCurPageData() {
      const curData = []
      const totalPage = Math.ceil(this.tableData.length / this.page.size)
      for (let i = 0; i < totalPage; i++) {
        curData[i] = this.tableData.slice(
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
            this.$store.commit('menu/SET_NAVBAR', {
              key: 'active',
              value: navI,
            })
            this.$store.commit('menu/SET_SIDEACTIVE', sideI)
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
    // 更新状态
    statusChange(mutations, data) {
      this.$store.commit(mutations, data)
    },
    // 删除单个
    deleteItem(mutations, data) {
      const index = this.tableData.findIndex((v) => v.id === data.row.id)
      this.$store.commit(mutations, index)
      if (!this.getCurPageData) {
        const totalPage = Math.ceil(this.tableData.length / this.page.size)
        if (totalPage < this.page.current) {
          this.page.current--
        }
      }
      this.page.total = this.tableData.length
    },
    // 批量删除
    deleteAll(mutations) {
      const list = this.tableData.filter((type) => {
        return !this.chooseList.some((v) => v.id === type.id)
      })
      this.$store.commit(mutations, list)
      if (!this.getCurPageData) {
        const totalPage = Math.ceil(this.tableData.length / this.page.size)
        if (totalPage < this.page.current) {
          this.page.current--
        }
      }
      this.page.total = this.tableData.length
      this.chooseList = []
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
