export default {
  watch: {
    $route() {
      this.__initNavbar()
      this.getBreadcrumb()
      sessionStorage.setItem('tab', JSON.stringify({ tab: 0 }))
    },
    tabIndex() {
      sessionStorage.setItem('tab', JSON.stringify({ tab: this.tabIndex }))
    },
  },
  methods: {
    __initTabBar() {
      const tab = JSON.parse(sessionStorage.getItem('tab'))
      if (tab) {
        this.tabIndex = tab.tab
      }
    },
  },
}
