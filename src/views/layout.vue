<template>
  <div>
    <el-container
      class="position-absolute"
      style="left: 0; top: 0; right: 0; bottom: 0; overflow: hidden;"
    >
      <!-- 顶部导航 -->
      <el-header class="d-flex align-items-center border-bottom">
        <router-link
          class="h5 mb-0 mr-auto"
          style="text-decoration: none;"
          :to="{ name: 'index' }"
          >{{ $conf.logo }}</router-link
        >
        <el-menu
          :default-active="navBar.active.toString()"
          mode="horizontal"
          menu-trigger="click"
          text-color="#409eff"
          active-text-color="#409eff"
          @select="navbarSelect"
        >
          <el-menu-item
            v-for="(nav, index) in navBar.list"
            :key="index"
            :index="index.toString()"
            :style="{ opacity: navBar.active == index ? 1 : 0.5 }"
            >{{ nav.title }}</el-menu-item
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
            :default-active="sideMenuActive.toString()"
            class="h-100"
            @select="sideSelect"
          >
            <el-menu-item
              v-for="(item, index) in sideMenus"
              :key="index"
              :index="index.toString()"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主内容区 -->
        <el-main style="position: relative" v-loading="loading">
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
            class="bg-light text-primary"
          ></el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import common from '@/common/mixins/common.js'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  provide() {
    return {
      $layout: this,
    }
  },
  mixins: [common],
  data() {
    return {
      breadcrumb: [],
      loading: false,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      navBar: (state) => state.menu.navBar,
    }),
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
  created() {
    this.getBreadcrumb()
    this.__initNavbar()
  },
  methods: {
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
      this.$store.commit('menu/SET_navbar', { key: 'active', value: index })
      // 默认选中侧栏菜单的第一项
      this.sideMenuActive = 0
      if (this.sideMenus.length > 0) {
        this.$router.push({ name: this.sideMenus[this.sideMenuActive].name })
      }
    },
    // 选择侧栏菜单项
    sideSelect(index) {
      if (this.sideMenuActive === index) return
      this.sideMenuActive = index
      this.$store.commit('menu/SET_sideActive', index)
      this.$router.push({ name: this.sideMenus[index].name })
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
      this.$store
        .dispatch('user/logout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
        .catch((error) => {
          this.$store.dispatch('user/removeToken').then(() => {
            this.$router.push({ name: 'login' })
          })
        })
    },
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
  },
}
</script>

<style scoped></style>
