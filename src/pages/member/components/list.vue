<template>
  <div>
    <el-table
      :data="memberData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="uid" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="状态" sortable width="180">
        <template slot-scope="scope">
            <el-button type="success" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
          
      </el-table-column>
      <el-table-column prop="name" label="操作" sortable width="180">
        <template slot-scope="scope">
             <el-button type="success" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
         
      </el-table-column>
    
    </el-table>
  </div>
</template>
<script>
export default {
  props: ["memberData"],
  components: {},
  data() {
    return {
       
      }
    },
  methods: {
      
      edit(uid){
        this.$emit("edit",uid)
      }
     
  },
  mounted() {
     
  },
};
</script>
<style scoped>
.el-table{
    margin: 20px;
}
</style>