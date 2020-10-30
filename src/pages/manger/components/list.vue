<template>
  <div>
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="" label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqMangerDel } from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";
export default {
  props: ["userList"],
  components: {},
  data() {
    return {};
  },
  methods: {
    edit(uid) {
      this.$emit("edit", uid);
    },
    del(uid) {
      this.$confirm("是否删除此管理员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqMangerDel(uid).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.$emit("init")
            }
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>