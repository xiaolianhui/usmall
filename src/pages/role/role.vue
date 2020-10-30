<template>
  <div>
    <el-button type="success" @click="add">添加</el-button>
    <v-add :info="info" ref = "empty"></v-add>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status == '1'"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqDelRole } from "../../util/request";
import vAdd from "./add";
import { mapActions, mapGetters } from "vuex";
import {alertSuccess,alertWarning} from '../../util/alert'
export default {
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  components: {
    vAdd,
  },
  data() {
    return {
      info: {
        isShow: false,
        title:"",
        btn:""
      },
    };
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestRoleList",
    }),
    edit(id){
       this.info={
        isShow: true,
        title:"人员添加",
        btn:2
      };
      this.$refs.empty.lookOne(id)
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          reqDelRole({ id: id }).then((res) => {
            if (res.data.code == 200) {
              alertSuccess(res.data.msg)
              this.requestRoleList();
            }else{
              alertWarning(res.data.msg)
            }
          });
        })
        .catch(() => {
          alertWarning("已取消删除")
        });
    },

    add() {
      this.info={
        isShow: true,
        title:"人员添加",
        btn:1
      };
       this.$refs.empty.empty()
    },
  },
  mounted() {
    this.requestRoleList();
  },
};
</script>
<style scoped>
.el-button,
.el-table {
  margin-top: 20px;
  margin-left: 10px;
}
</style>
