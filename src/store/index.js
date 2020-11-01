import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)
import list from "./modules/list.js"
import role from "./modules/role.js"
import classify from "./modules/classify.js"
import spec from "./modules/spec.js"
import goods from "./modules/goods.js"
import banner from "./modules/banner.js"
import seckill from "./modules/seckill.js"

import {actions} from "./anctions"
import {state,mutations,getters} from "./mutations"

export default new Vuex.Store({
	actions,
	state,
	mutations,
	getters,
		modules:{
			list,
			role,
			classify,
			spec,
			goods,
			banner,
			seckill
		}
	
})