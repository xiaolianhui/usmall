import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)
import list from "./modules/list.js"
import role from "./modules/role.js"
import classify from "./modules/classify.js"
import spec from "./modules/spec.js"
import goods from "./modules/goods.js"

export default new Vuex.Store({
	
		modules:{
			list,
			role,
			classify,
			spec,
			goods
		}
	
})