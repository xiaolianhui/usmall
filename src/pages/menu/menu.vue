<template>
<div>
    <el-button type="success"  @click = "addShow">添加</el-button>
	<v-list @edit="edit(arguments)"></v-list>
	<v-add :json= "json" ref="add"></v-add>
</div>
</template> 
<script>
	import vList from "./components/list.vue"
	import vAdd from "./components/add.vue"
export default {
components:{
	vList,
	vAdd
 },
data () {
 return {
	 json:{
		 isShow:false,
		 title:"",
		 btn:""
	 }
 }
},
methods:{
	addShow(){
		this.$refs.add.empty()
		this.json={
		 isShow:true,
		 title:"菜单添加",
		 btn:"添加"
	 }
	},
	edit(argu){

		this.json ={
		 isShow:true,
		 title:"菜单编辑",
		 btn:"修改"
	 }
	 this.$refs.add.look(argu[0],argu[1])
	}
},
mounted(){
}
}
</script>
<style scoped>
	.el-button{
		margin-top: 20px;
		margin-left: 10px;
	}
</style>