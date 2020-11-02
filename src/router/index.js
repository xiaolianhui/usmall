import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"

function checkedRouter(path,next){
  let userInfo = store.state.userInfo;
  if (userInfo.menus_url.includes(path)) {
    next()
  } else {
    next("/index")
  }
}


Vue.use(Router)

const login = () => import("../pages/login/login")
const index = () => import("../pages/index/index")


const banner = () => import("../pages/banner/banner")
const classify = () => import("../pages/classify/classify")
const goods = () => import("../pages/goods/goods")
const manger = () => import("../pages/manger/manger")
const member = () => import("../pages/member/member")
const menu = () => import("../pages/menu/menu")
const role = () => import("../pages/role/role")
const seckill = () => import("../pages/seckill/seckill")
const specs = () => import("../pages/specs/specs")
const home = () => import("../pages/home/home")

export const indexRouters = [
  {
    path: "banner",
    component: banner,
    name: "轮播图管理",
    // 路由独享守卫
    beforeEnter(to, from, next) {
      checkedRouter("/banner",next)
    }
  },
  {
    path: "home",
    component: home,
    // name: "首页",
  },
  {
    path: "classify",
    component: classify,
    name: "商品分类",
    beforeEnter(to, from, next) {
      checkedRouter("/classify",next)
    }
  },
  {
    path: "goods",
    component: goods,
    name: "商品管理",
    beforeEnter(to, from, next) {
      checkedRouter("/goods",next)
    }
  },
  {
    path: "manger",
    component: manger,
    name: "管理员管理",
    beforeEnter(to, from, next) {
      checkedRouter("/manger",next)
    }
  },
  {
    path: "member",
    component: member,
    name: "会员管理",
    beforeEnter(to, from, next) {
      checkedRouter("/member",next)
    }
  },
  {
    path: "menu",
    component: menu,
    name: "菜单管理",
    beforeEnter(to, from, next) {
      checkedRouter("/menu",next)
    }
  },
  {
    path: "role",
    component: role,
    name: "角色管理",
    beforeEnter(to, from, next) {
      checkedRouter("/role",next)
    }
  },
  {
    path: "seckill",
    component: seckill,
    name: "秒杀活动",
    beforeEnter(to, from, next) {
      checkedRouter("/seckill",next)
    }


  },
  {
    path: "specs",
    component: specs,
    name: "商品规格",
    beforeEnter(to, from, next) {
      checkedRouter("/specs",next)
    }
  },
]

const router = new Router({
  routes: [

    {
      path: "/login",
      component: login
    },
    {
      path: "/index",
      component: index,
      children: [
        {
          path: "",
          redirect: "home"
        },
        ...indexRouters
      ]

    },
    {
      path: "/",
      redirect: "login"
    },

  ]
})
// 登录拦截
router.beforeEach((to, from, next) => {
  // 如果取得是登陆也就让他去
  if (to.path == "/login") {
    next();
    return;
  }
  if (to.path !== "/login") {
    // 可以从缓存中拿数据，也可以从vuex中拿
    let userInfo = store.state.userInfo;
    if (userInfo.username) {
      next();
      return;
    }
    next("/login")
  }

})

export default router