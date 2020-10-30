<template>
  <div>
    <v-list :memberData="memberData" @edit="edit($event)"></v-list>
    <v-update ref="update" @init="getmember"></v-update>
  </div>
</template>
<script>
import vList from "./components/list";
import vUpdate from "./components/update";
import { reqMemberRole } from "../../util/request";
export default {
  components: {
    vUpdate,
    vList,
  },
  data() {
    return {
         memberData:[],
    };
  },
  methods: {
    edit(uid) {
      this.$refs.update.look(uid);
    },
    getmember(){
        reqMemberRole().then((res) => {
      if (res.data.code === 200) {
        this.memberData = res.data.list;
      }
    });
    }
  },
  mounted() {
    this.getmember()
  },
};
</script>
<style scoped>
</style>