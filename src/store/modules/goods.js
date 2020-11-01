import {reqGoodsList,reqGoodsTotal} from "../../util/request" 
const state = {
	list:[],
	total:0,
	size:2,
	page:1
}
const mutations = {
	changeList(state,arr){
		state.list = arr
	},
	changeCount(state,total){
		state.total=total
	},
	changePage(state,page){		
		state.page = page
	},
	changePageDel(state,page){
		state.page = page
	}
}
const actions = {
	requestGoodList(context,bool){
		let p = bool?{}:{ page: context.state.page, size: context.state.size }
		reqGoodsList(p).then((res)=>{
			let list = res.data.list ? res.data.list : [];
			if(list.length==0&&context.state.page>1){
				context.commit("changePageDel",context.state.page-1)
				context.dispatch("requestGoodList");
				return;
			}
			context.commit("changeList",res.data.list)
		})
	},
	requestGoodsTotal(context){
		reqGoodsTotal().then(res=>{
			context.commit("changeCount",res.data.list[0].total)
		})
	},
	requestGoodsPage(context,page){
		context.commit("changePage",page)
	}

}
const getters = {
	list(state){
		return state.list
	},
	total(state){
		return state.total
	},
	size(state){
		return state.size
	}
}
export default {
	state,
	mutations,
	actions,
	getters,
	namespaced:true	
}