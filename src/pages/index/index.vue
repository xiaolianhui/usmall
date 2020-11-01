<template>
  <div>
    <el-container class="box1">
      <el-aside width="200px">
        <!-- 左侧导航 -->
        <el-menu
          router
          default-active="/index/home"
          unique-opened
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/index/home" width="100px">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!--有目录  -->
            <el-submenu v-if="item.children" :index="item.id + ''">
              <template slot="title">
                <i class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id + ''"
                  :index="'/index' + i.url"
                  >{{ i.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <!-- 没有目录 -->
            <el-menu-item :index="'/index'+item.url" v-else>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span>{{ userInfo.username }}</span>
          <el-button type="primary" @click="signOut">退出</el-button>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb
            v-if="$route.name"
            separator-class="el-icon-arrow-right"
          >
            <el-breadcrumb-item :to="{ path: '/index/home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      changeUserInfoActions: "changeUserInfoActions",
    }),
    signOut() {
      this.changeUserInfoActions({});
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
  line-height: 60px;
}

.el-aside {
  height: 100%;
  background-color: #b3c0d1;
  color: #333;
  line-height: 200px;
}
.box1 {
  width: 100vw;
  height: 100vh;
}
.el-main {
  background-color: #fff;
  color: #333;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 199px;
  height: 100vh;
}

.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 199px;
}

.el-icon-setting {
  font-size: 20px;
}
</style>
