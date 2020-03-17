import { get, set } from '@/utils/auth'
export default {
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
  },
}
