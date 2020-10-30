<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180">
      </el-table-column>

      <el-table-column prop="attrs" label="规格属性" sortable width="180">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="success"
            >启用</el-button
          >
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @current-change="changePage" layout="prev, pager, next" :page-size="size" :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqSpecDel } from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "spec/list",
      total: "spec/total",
      size:"spec/size",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestSpecList: "spec/requestSpecList",
      requestSpecTotal: "spec/requestSpecTotal",
      changePageAction:"spec/changePageAction"

    }),
    del(id) {
      this.$confirm("您确定要将此条数据删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqSpecDel(id).then((res) => {
            if (res.data.code == 200) {
              alertSuccess(res.data.msg);
              this.requestSpecList();
               this.requestSpecTotal()
            } else {
              alertWarning(res.data.msg);
            }
          });
        })
        .catch(() => {
          alertWarning("已取消删除");
        });
    },
    edit(id) {
      this.$emit("init", id);
    },
    changePage(page){
      this.changePageAction(page);
      this.requestSpecList()
    }
  },
  mounted() {
    this.requestSpecList();
    this.requestSpecTotal();
  },
};
</script>
<style scoped>
</style>
