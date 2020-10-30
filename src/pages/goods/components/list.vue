<template>
<div>
     <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号" sortable width="180">
      </el-table-column>

      <el-table-column prop="goodsname" label="商品名称" sortable width="180">
      </el-table-column>
      <el-table-column label="图片" sortable width="180">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" >
        </template>
      </el-table-column>

      <el-table-column prop="status" label="是否新品">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="danger" v-if="scope.row.isnew == 2">否</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="是否热卖">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="danger" v-if="scope.row.ishot == 2">否</el-button>
        </template>
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
import {reqGoodsDel} from "../../../util/request"
export default {
components:{
 },
 computed: {
   ...mapGetters({
     list:"goods/list"
   })
 },
data () {
 return {
 }
},
methods:{
  ...mapActions({
    requestGoodList:"goods/requestGoodList"
  }),
 del(id) {
      this.$confirm("您确定要删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
          reqGoodsDel(id).then((res) => {
            if (res.data.code == 200) {
              alertSuccess(res.data.msg);
              this.requestGoodList();
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
}

},
mounted(){
  this.requestGoodList()
}
}
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>