export default {
  filters: {
    numToString(value) {
      return value.toString()
    }
  },
  watch: {
    tabIndex() {
      const key = this.$options.name + '_tabActive'
      sessionStorage.setItem(key, JSON.stringify({ tab: this.tabIndex }))
    }
  },
  methods: {
    __initTabBar(page = '') {
      let t = sessionStorage.getItem(page + '_tabActive')
      if (t) {
        t = JSON.parse(t)
        this.tabIndex = t.tab
      }
    }
  }
}
