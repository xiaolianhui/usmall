import { reqSpecList, reqSpecTotal } from "../../util/request"
const state = {
    list: [],
    total: 0,
    size: 2,
    page: 1,
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeTotal(state, total) {
        state.total = total
    },
    // 改变页数
    changePage(state, page) {
        state.page = page
    },
    // 这一页删除完的时候
    changePageDel(state,page){
        state.page=page-1
    }
}
const actions = {

    // 获取总数
    requestSpecTotal(context) {
        reqSpecTotal().then(res => {
            if (res.data.code == 200) {
                context.commit("changeTotal", res.data.list[0].total)
            }
        })
    },

    // VUE组件通过该方法调用修改页码的方法
    changePageAction(context, page) {
        context.commit("changePage", page)
    },

    // 获取规格列表
    requestSpecList(context,bool) {
        let p = bool?{}:{ page: context.state.page, size: context.state.size }
        reqSpecList(p).then(res => {

            let list = res.data.list ? res.data.list : [];

            if(list.length==0&&context.state.page>1){
                context.commit("changePageDel",context.state.page)
                context.dispatch("requestSpecList")
                return;
            }

            //由于取回来的数据attrs是字符串 需要转换一下
            list.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
            })

            context.commit("changeList", list)
        })

    }
}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
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
    namespaced: true

}