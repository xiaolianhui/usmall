<template>
  <div>
    <el-table
      :data="list"
      style="width: 90%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
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
          <el-button type="success" @click="edit(scope.row.id,scope.row.url)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqDelList } from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "list/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqMenuList: "list/reqMenuList",
    }),
    edit(id,url) {
      this.$emit("edit", id,url);
    },

    del(delId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqDelList({ id: delId }).then((res) => {
            if (res.data.code == 200) {
              alertSuccess(res.data.msg);
              this.reqMenuList();
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
    this.reqMenuList();
  },
};
</script>
<style scoped>
.el-table {
  margin: 10px 0 0 25px;
}
</style>
