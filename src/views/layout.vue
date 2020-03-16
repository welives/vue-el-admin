<template>
  <div>
    <el-container
      class="position-absolute"
      style="left: 0; top: 0; right: 0; bottom: 0; overflow: hidden;"
    >
      <!-- 顶部导航 -->
      <el-header class="d-flex align-items-center border-bottom">
        <a class="h5 text-primary mb-0 mr-auto">{{ $conf.logo }}</a>
        <el-menu
          :default-active="navBar.active | numToString"
          mode="horizontal"
          text-color="#409eff"
          active-text-color="#409eff"
          @select="navbarSelect"
        >
          <el-menu-item
            v-for="(nav, index) in navBar.list"
            :key="index"
            :index="index | numToString"
            :style="{ opacity: navBar.active == index ? 1 : 0.5 }"
            >{{ nav.name }}</el-menu-item
          >
          <el-submenu index="10">
            <template slot="title">
              <el-avatar
                size="small"
                :src="
                  user.avatar
                    ? user.avatar
                    : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                "
              ></el-avatar>
              {{ user.username }}</template
            >
            <el-menu-item index="10-1">修改</el-menu-item>
            <el-menu-item index="10-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container class="h-100">
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-menu
            :default-active="sideMenuActive | numToString"
            class="h-100"
            @select="sideSelect"
          >
            <el-menu-item
              v-for="(item, index) in sideMenus"
              :key="index"
              :index="index | numToString"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主内容区 -->
        <el-main style="position: relative">
          <!-- 面包屑导航 -->
          <div
            v-if="breadcrumb.length"
            class="border-bottom"
            style="margin: -20px -20px 0; padding: 20px"
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item, index) in breadcrumb"
                :key="index"
                :to="item.path"
                >{{ item.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <router-view></router-view>
          <el-backtop
            style="z-index: 9999;"
            target=".el-main"
            class="bg-light"
          ></el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import common from '@/common/mixins/common.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  mixins: [common],
  data() {
    return {
      navBar: {},
      breadcrumb: [],
    }
  },
  computed: {
    ...mapGetters(['user']),
    // 获取,设置当前激活的侧栏菜单
    sideMenuActive: {
      get() {
        return this.navBar.list[this.navBar.active].sideActive
      },
      set(index) {
        this.navBar.list[this.navBar.active].sideActive = index
      },
    },
    // 获取当前导航下的侧栏菜单组
    sideMenus() {
      return this.navBar.list[this.navBar.active].sideMenu || []
    },
  },
  watch: {
    $route() {
      sessionStorage.setItem(
        'navActive',
        JSON.stringify({
          navBar: this.navBar.active,
          sideMenu: this.sideMenuActive,
        }),
      )
      this.getBreadcrumb()
    },
  },
  created() {
    this.navBar = this.$conf.navBar
    this.getBreadcrumb()
    this.__initNavbar()
  },
  methods: {
    // 初始化导航栏
    __initNavbar() {
      let r = sessionStorage.getItem('navActive')
      if (r) {
        r = JSON.parse(r)
        this.navBar.active = r.navBar
        this.sideMenuActive = r.sideMenu
      }
    },
    // 选择导航项
    navbarSelect(index) {
      if (index === '10-1') {
        return console.log('修改资料')
      }
      if (index === '10-2') {
        this.logout()
        return console.log('退出系统')
      }
      if (this.navBar.active === index) return
      this.navBar.active = index
      // 默认选中侧栏菜单的第一项
      this.sideMenuActive = 0
      if (this.sideMenus.length > 0) {
        this.$router.push({ name: this.sideMenus[this.sideMenuActive].path })
      }
    },
    // 选择侧栏菜单项
    sideSelect(index) {
      if (this.sideMenuActive === index) return
      this.sideMenuActive = index
      this.$router.push({ name: this.sideMenus[index].path })
    },
    // 获取面包屑导航
    getBreadcrumb() {
      const routes = this.$route.matched
      const arr = []
      routes.forEach((v) => {
        if (v.name === 'index' || v.name === 'layout') return
        arr.push({ name: v.name, path: v.path, title: v.meta.title })
      })
      if (arr.length > 0) {
        arr.unshift({ name: 'index', path: '/index', title: '后台首页' })
      }
      this.breadcrumb = arr
    },
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push({ name: 'login' })
      })
    },
  },
}
</script>

<style scoped></style>
