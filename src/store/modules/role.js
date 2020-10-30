import {reqRoleList} from "../../util/request"
const state = {
    roleList : []
}
const mutations = {
    changeRoleList(state,arr){
        state.roleList = arr
    }
}

const actions={
    requestRoleList(context){
        reqRoleList().then((res)=>{
            context.commit("changeRoleList",res.data.list)
        })
    }
}
const getters= {
    list(state){
        return state.roleList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}