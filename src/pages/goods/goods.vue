<template>
<div>
    <el-button  type="success" @click="willAdd">添加</el-button>
    <v-list @init ="edit($event)"></v-list>
    <v-add ref="add" :info="info"></v-add>
</div>
</template>
<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
components:{
    vList,
    vAdd
 },
data () {
 return {
     info:{
         isShow:false,
         title:"商品添加"
     }
 }
},
methods:{
    willAdd(){
        this.info={
            isShow:true,
            title:"商品添加"
        }
        this.$refs.add.empty()
    },
    edit(id){
        this.info={
            isShow:true,
            title:"商品修改"
        }
        this.$refs.add.look(id)
    }
},
mounted(){
}
}
</script>
<style scoped>
.el-button{
    margin: 20px;
}
</style>