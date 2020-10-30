import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const login = ()=>import("../pages/login/login")
const index = ()=>import("../pages/index/index")


const banner = ()=>import("../pages/banner/banner")
const classify = ()=>import("../pages/classify/classify")
const goods = ()=>import("../pages/goods/goods")
const manger = ()=>import("../pages/manger/manger")
const member = ()=>import("../pages/member/member")
const menu = ()=>import("../pages/menu/menu")
const role = ()=>import("../pages/role/role")
const seckill = ()=>import("../pages/seckill/seckill")
const specs = ()=>import("../pages/specs/specs")
const home = ()=>import("../pages/home/home")

export const indexRouters= [
  {
    path:"banner",
    component:banner,
		name:"轮播图管理"
  },
  {
    path:"home",
    component:home,
  },
  {
    path:"classify",
    component:classify,
	name:"商品分类"
  },
  {
    path:"goods",
    component:goods,
	name:"商品管理"
  },
  {
    path:"manger",
    component:manger,
	name:"管理员管理"
  },
  {
    path:"member",
    component:member,
	name:"会员管理"
  },
  {
    path:"menu",
    component:menu,
	name:"菜单管理"
  },
  {
    path:"role",
    component:role,
	name:"角色管理"
  },
  {
    path:"seckill",
    component:seckill,
	name:"秒杀活动"
	
	
  },
  {
    path:"specs",
    component:specs,
	name:"商品规格"
  },
]

export default new Router({
  routes: [
    
    {
      path:"/login",
      component:login
    },
    {
      path:"/index",
      component:index,
      children:[
        {
          path:"",
          redirect:"home"
        },
        ...indexRouters
      ]

    },
    {
      path:"/",
      redirect:"login"
    },
   
  ]
})
