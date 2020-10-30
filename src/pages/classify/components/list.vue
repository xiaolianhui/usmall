<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column  label="图片"> 
        <template slot-scope="scope">
            <img class="img" v-if="scope.row.img!=='null'" :src="$imgPre+scope.row.img" alt="">
        </template>
        
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status == 1"
            >启用</el-button
          >
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
import { mapActions,mapGetters } from "vuex";
import {reqClassifyDel} from "../../../util/request"
import {alertSuccess,alertWarning} from "../../../util/alert"

export default {
  computed: {
    ...mapGetters({
      list:"classify/list"
    })
  },
  components: {},

  data() {
    return {

    };
  },
  methods: {
    ...mapActions({
      reqCateList:"classify/reqCateList"
    }),
    edit(id){
      this.$emit("init",id)
    },
     del(id) {
      this.$confirm("您确定要删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqClassifyDel(id).then((res) => {
            if (res.data.code == 200) {
              alertSuccess(res.data.msg);
              this.reqCateList({istree:true});
            }else{
              alertWarning(res.data.msg);
            }
          });
        })
        .catch(() => {
          alertWarning("已取消删除");
        });
    },
  
  },
  mounted() {
    this.reqCateList({istree:true})
  },
};
</script>
<style scoped>
.img{
  width: 100px;
  height: 100px;
}
</style>