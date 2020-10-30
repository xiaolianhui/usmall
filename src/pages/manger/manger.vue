<template>
  <div>
    <el-button type="success"  @click="add">添加</el-button>
    <v-list
   
      :userList="userList"
      @init="getInit"
      @edit="edit($event)"
    ></v-list>
    <v-add :info="info" ref="add" @init="getInit"></v-add>

    <el-pagination
      layout="prev, pager, next"
      :page-size="size"
      @current-change="changePage"
      :total="count"
    >
    </el-pagination>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqMangerRole, reqMangerCount } from "../../util/request";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "管理员添加",
        act: "添加",
      },
      count: 0,
      page: 1,
      size: 2,
      // currentPage: 1, //初始页
      // pagesize: 10, //每页的数据
      userList: [],
    };
  },
  methods: {
     getInit() {
      reqMangerCount().then((res) => {
        this.count = res.data.list[0].total;
      });
      this.getMangerList();
    },

    getMangerList() {
      reqMangerRole({ page: this.page, size: this.size }).then((res) => {
        if (res.data.code == 200) {
           let list=res.data.list?res.data.list:[]
          if (list.length===0&&this.page>1) {
            this.page--
            this.getMangerList();
            return;
          }
          this.userList = list;
        }
      });
    },
   
    changePage(page) {
        this.page = page;
        this.getMangerList();
      
    },
    // 添加按钮
    add() {
      this.info = {
        isShow: true,
        title: "管理员添加",
        act: "添加",
      };
      this.$refs.add.empty()
    },
    edit(uid) {
      this.info = {
        isShow: true,
        title: "管理员修改",
        act: "修改",
      };
      this.$refs.add.look(uid);
    },
  },
  mounted() {
    this.getInit();
  },
};
</script>
<style scoped>
.el-button {
  margin: 20px;
}
</style>
