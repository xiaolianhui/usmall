<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">

        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

         <el-form-item v-for="(item,index) in attrArr" :key="index" label="规格属性" :label-width="formLabelWidth">
           <div class="specBox">
                <el-input class="ipt" v-model="item.val" autocomplete="off"></el-input>
                <el-button type="success" v-if="index===0" @click="specAdd">新增规格属性</el-button>
                <el-button type="danger" v-else @click="specDel(inedx)">删除</el-button>
           </div>
        </el-form-item>


        <el-form-item label="状态" :label-width="formLabelWidth" >
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>



      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button v-if="info.title=='规格添加'" type="primary" @click="add">添 加</el-button>
        <el-button v-else type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {reqSpecAdd,reqOneSpec,reqSpecUpdate} from "../../../util/request"
import {alertSuccess,alertWarning} from "../../../util/alert"
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
        dialogFormVisible:false,
        formLabelWidth:"120px",
        form:{
            specsname:"",
            attrs:"",
            status:1
        },
        attrArr:[{val:""}]
    };
  },
  methods: {
    ...mapActions({
      requestSpecList: "spec/requestSpecList",
       requestSpecTotal: "spec/requestSpecTotal",
    }),
    specAdd(){
      this.attrArr.push({val:""})
    },
    specDel(index){
      this.attrArr.splice(index,1)
    },
    empty(){
      this.form={
            specsname:"",
            attrs:"",
            status:1
        },
        this.attrArr=[{val:""}]
    },
    add(){
      //[{val:"1"},{val:"2"}]  --->["1","2"]  this.attrArr.map(item=>item.val)
        this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.val))

        // 发送请求
        reqSpecAdd(this.form).then(res=>{
          if(res.data.code==200){
            this.info.isShow=false
            alertSuccess("添加成功")
            this.empty()
            this.requestSpecList()
            this.requestSpecTotal()
          }
        })
    },
    // 获取一条数据
    look(id){
      reqOneSpec(id).then(res=>{
        
        console.log(this.form.attrs)
        this.form = res.data.list[0]
        // 将["1","2"]转换成[{val:"1"},{val:"2"}]
        this.attrArr = JSON.parse(this.form.attrs).map(item=>{return {val:item}})
      })
    },
      update(){
        this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.val))
        console.log(this.form)
        reqSpecUpdate(this.form).then(res=>{
          if(res.data.code==200){
              this.info.isShow = false;
              this.empty();
              this.requestSpecList();
              alertSuccess("修改成功")
          }
        })
      
  },
  },

  mounted() {},
};
</script>
<style scoped>
.specBox{
  display: flex;
}
.ipt{
  flex: 1;
}
</style>