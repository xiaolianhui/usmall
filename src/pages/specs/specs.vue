<template>
  <div>
    <el-button type="success" @click="willAdd">添加</el-button>
    <v-add ref="add" :info="info"></v-add>
    <v-list @init="edit($event)"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "规格添加",
      },
    };
  },
  methods: {
    willAdd() {
      this.info = {
        isShow: true,
        title: "规格添加",
      };
      this.$refs.add.empty()
    },
    edit(id) {
        this.info = {
        isShow: true,
        title: "规格修改",
      };
      this.$refs.add.look(id)
    },
  },
  mounted() {},
};
</script>
<style scoped>
.el-button {
  margin: 20px;
}
</style>