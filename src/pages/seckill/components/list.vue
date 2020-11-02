<template>
<div >
     <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >


      <el-table-column prop="title" label="活动名称" sortable width="180">
      </el-table-column>
     

    
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="info" v-if="scope.row.status == 2">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

</div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
import {alertSuccess,alertWarning} from "../../../util/alert"
import {reqSeckillDel} from "../../../util/request"
export default {
components:{
 },
 computed: {
   ...mapGetters({
     list:"seckill/list",
   })
 },
data () {
 return {
 }
},
methods:{
  ...mapActions({
    requestSeckillList:"seckill/requestSeckillList",
  }),
 del(id) {
      this.$confirm("您确定要删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
          reqSeckillDel(id).then((res) => {
            if (res.data.code == 200) {
              alertSuccess(res.data.msg);
              this.requestSeckillList();
            }else{
              alertWarning(res.data.msg);
            }
          });
        })
        .catch(() => {
          alertWarning("已取消删除");
        });
    },

edit(id){
  this.$emit("init",id)
},


},
mounted(){
  this.requestSeckillList();
}
}
</script>
<style scoped>

img{
  width: 100px;
  height: 100px;
}
</style>