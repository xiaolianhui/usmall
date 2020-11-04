
export const state={
    // 刷新页面时，本地存储还在，但是仓库中的数据没有了，所以要看一下本地本地存储里有没有数据(取不到值时null)，有的话，直接给仓库，没有的话就给个空
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")) :{}
}
export const mutations={
    changeUserInfo(state,info){
        // 仓库中有了登录的信息，同时也需要进行本地缓存，当退出时，会传过来一个空对象，vuex中就没有了数据
        state.userInfo = info
        // 进行本地存储,登录时进行正常存储（也就是传过来的info有数据，进行存储），点击退出的时候穿过来的是一个空对象，就不会就行存储并且会清空原先存储在本地的数据
        if(info.username){
            sessionStorage.setItem("userInfo",JSON.stringify(info))
        }else{
            sessionStorage.removeItem("userInfo")
        }
    }
}
export const getters={
    userInfo(state){
        return state.userInfo
    }
}