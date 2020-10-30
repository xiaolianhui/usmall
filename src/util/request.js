import axios from "axios"
import { alertWarning } from "./alert"
import qs from "qs"
import Vue from "vue"
const baseUrl = "/api"
Vue.prototype.$imgPre = "http://localhost:3000"

// 响应拦截
axios.interceptors.response.use((res) => {
	// console.log("111")
	if (res.data.code!== 200) {
		alertWarning(res.data.msg)
		return
	}
	console.log(res)
		return res

})

// 获取菜单列表
export const reqList = (istree) => {
	return axios({
		url: baseUrl+"/api/menulist",
		method: "get",
		params: istree
	})
}

// 添加列表
export const reqAddList = (list) => {
	return axios({
		url: baseUrl+"/api/menuadd",
		method: "post",
		data: qs.stringify(list)
	})
}
// 删除列表
export const reqDelList = (delId) => {
	return axios({
		url: baseUrl+"/api/menudelete",
		method: "post",
		data: qs.stringify(delId)
	})
}

// 获取一条数据

export const reqOneList = (oneId) => {
	return axios({
		url: baseUrl+"/api/menuinfo",
		method: "get",
		params: oneId
	})
}

// 修改列表
export const reqUpdateList = (editList) => {
	return axios({
		url: baseUrl+"/api/menuedit",
		method: "post",
		data: qs.stringify(editList)
	})
}

// 获取用户列表
export const reqRoleList = () => {
	return axios({
		url: baseUrl+"/api/rolelist",
		method: "get",
	})
}

// 删除用户
export const reqDelRole = (id) => {
	return axios({
		url: baseUrl+"/api/roledelete",
		method: "post",
		data: qs.stringify(id)
	})
}

// 角色添加  

export const reqAddRole = (RoleIn) => {
	return axios({
		url: baseUrl+"/api/roleadd",
		method: "post",
		data: qs.stringify(RoleIn)
	})
}

// 获取一条角色

export const reqOneRole = (roleId) => {
	return axios({
		url: baseUrl+"/api/roleinfo",
		method: "get",
		params: roleId
	})
}

// 修改角色
export const reqEditRole = (EditRole) => {
	return axios({
		url: baseUrl+"/api/roleedit",
		method: "post",
		data: qs.stringify(EditRole)
	})
}

// 获取管理员列表
export const reqMangerRole = (params) => {
	return axios({
		url: baseUrl+"/api/userlist",
		method: "get",
		params:params
	})
}	
// 添加管理员
export const reqMangerAdd = (form) => {
	return axios({
		url: baseUrl+"/api/useradd",
		method: "post",
		data:qs.stringify(form)
	})
}	
// 获取管理员一条数据
export const reqOneManger = (uid) => {
	return axios({
		url: baseUrl+"/api/userinfo",
		method: "get",
		params:{
			uid:uid
		}
	})
}	
// 管理员修改
export const reqMangerEdit = (form) => {
	return axios({
		url: baseUrl+"/api/useredit",
		method: "post",
		data:qs.stringify(form)
	})
}	
// 管理员删除
export const reqMangerDel = (uid) => {
	return axios({
		url: baseUrl+"/api/userdelete",
		method: "post",
		data:qs.stringify({
			uid:uid
		})
	})
}	

// 管理员总数
export const reqMangerCount = () => {
	return axios({
		url: baseUrl+"/api/usercount",
		method: "get",
	})
}	

// 分类添加

export const reqClassifyAdd = (form) => {
	return axios({
		url: baseUrl+"/api/cateadd",
		method: "post",
		data:form
	})
}	
// 商品分类列表
// 
export const reqClassifyList = (params) => {
	return axios({
		url: baseUrl+"/api/catelist",
		method: "get",
		params:params
	})
}	

// 商品分类修改 
export const reqClassifyDel = (id) => {
	return axios({
		url: baseUrl+"/api/catedelete",
		method: "post",
		data:qs.stringify({
			id:id
		})
	})
}	

// 商品分类获取一条数据
export const reqOneClassify = (id) => {
	return axios({
		url: baseUrl+"/api/cateinfo",
		method: "get",
		params:{
			id:id
		}
	})
}	
// 修改商品分类
export const reqClassifyUpdate = (data) => {
	return axios({
		url: baseUrl+"/api/cateedit",
		method: "post",
		data:data
	})
}	



//商品规格列表

export const reqSpecList = (data) => {
	return axios({
		url: baseUrl+"/api/specslist",
		method: "get",
		params:data
	})
}	
// 商品规格添加
export const reqSpecAdd = (data) => {
	return axios({
		url: baseUrl+"/api/specsadd",
		method: "post",
		data:qs.stringify(data)
	})
}	

// 商品规格删除
export const reqSpecDel = (id) => {
	return axios({
		url: baseUrl+"/api/specsdelete",
		method: "post",
		data:qs.stringify({
			id:id
		})
	})
}

// 获取规格一条数据
export const reqOneSpec = (id) => {
	return axios({
		url: baseUrl+"/api/specsinfo",
		method: "get",
		params:{
			id:id
		}
	})
}	
// 商品规格修改
export const reqSpecUpdate = (data) => {
	return axios({
		url: baseUrl+"/api/specsedit",
		method: "post",
		data:data
	})
}	
// /获取总数
export const reqSpecTotal = () => {
	return axios({
		url: baseUrl+"/api/specscount",
		method: "get",
	
	})
}	


// 商品管理列表
export const reqGoodsList = (data) => {
	return axios({
		url: baseUrl+"/api/goodslist",
		method: "get",
		params:data
	})
}	
// 商品添加
export const reqGoodsAdd = (data) => {
	return axios({
		url: baseUrl+"/api/goodsadd",
		method: "post",
		data:data
	})
}
// 商品删除
export const reqGoodsDel = (id) => {
	return axios({
		url: baseUrl+"/api/goodsdelete",
		method: "post",
		data:qs.stringify({
			id:id
		})
	})
}

// 获取商品一条数据
export const reqOneGoods = (id) => {
	return axios({
		url: baseUrl+"/api/goodsinfo",
		method: "get",
		params:{
			id:id
		}
	})
}	

















































// 获取会员列表
export const reqMemberRole = () => {
	return axios({
		url: baseUrl+"/api/memberlist",
		method: "get",
	})
}

// 获取会员一条数据

export const reqOneMember = (uid) => {
	return axios({
		url: baseUrl+"/api/memberinfo",
		method: "get",
		params:{
			uid:uid
		}
	})
}


// 修改会员

export const reqEditMember = (form) => {
	return axios({
		url: baseUrl+"/api/memberedit",
		method: "post",
		data:qs.stringify(form)
	})
}