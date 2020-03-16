export default {
  namespaced: true,
  state: {
    navBar: {
      active: 0,
      list: [],
    },
  },
  mutations: {
    createNavbar(state, menus) {
      const list = menus.map((item) => {
        return {
          name: item.name,
          sideActive: 0,
          sideMenu: item.child.map((v) => {
            return {
              icon: v.icon,
              name: v.name,
              path: v.desc,
            }
          }),
        }
      })
      state.navBar.list = list
      sessionStorage.setItem('navBar', JSON.stringify(state.navBar))
    },
  },
  actions: {},
}
