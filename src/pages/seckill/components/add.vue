<template>
  <div class="add">
     <el-dialog :title="info.title" :visible.sync="info.isShow" >
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="mwidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动名称" :label-width="mwidth">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="mwidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择一级分类"
            @change="changeFirst"
          >
            <el-option :label="'---请选择---'" :value="0" disabled></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="mwidth">
          <el-select v-model="form.second_cateid" placeholder="请选择二级分类">
            <el-option
              v-for="item in second_cate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

       


        <el-form-item label="商品" :label-width="mwidth">
          <el-select
            v-model="form.goodsid"
            placeholder="请选择商品"
          >
            <el-option
              v-for="item in goodList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

    

        <!-- :label-width="width" -->
        <el-form-item label="状态" :label-width="mwidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" v-if="info.title == '商品添加'" @click="add"
          >添加</el-button
        >

        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import {reqClassifyList,reqSeckillAdd,reqOneGoods,reqGoodsUpdate} from "../../../util/request"
import {alertSuccess,alertWarning} from "../../../util/alert"
export default {
  props: ["info"],
  components: {},
  computed: {
    // 分类列表
      ...mapGetters({
           list:"classify/list",
           goodList: "goods/list",
           specList:"seckill/list"
      })
  },
  data() {
    return {
      form: {
        title: "",
        begintime: 0,
        endtime: 0,
        first_cateid: 0,
        second_cateid: 0,
        goodsid:0,
        status:1
      },
      value1:0,
       mwidth: "120px",
      //  二级分类
      second_cate:[]
    };
  },
  methods: {
      ...mapActions({
        //  商品列表
         requestGoodList:"goods/requestGoodList",
         reqCateList:"classify/reqCateList",
         requestSeckillList:"seckill/requestSeckillList"
      }),
      
      // 表格置空
      empty(){
        this.form={
        title: "",
        begintime: 0,
        endtime: 0,
        first_cateid: 0,
        second_cateid: 0,
        goodsid:0,
        status:1
      },
      this.value1=0,
      //  二级分类
      this.second_cate=[]
      },
      // 添加按钮
      add(){
        var time1 = this.value1[0].getTime();
        this.form.begintime=time1;
         var time2 = this.value1[1].getTime();
        this.form.endtime=time2;
        console.log(this.form)
        // /发请求
        reqSeckillAdd(this.from).then(res=>{
          if(res.data.code===200){
              this.info.isShow=false
              alertSuccess("添加成功")
              this.requestSeckillList()
          }
        })
      },
    // update(){
    //    // 需要进行一下深拷贝，不拷贝的话，将数组转换为字符串数组之后，页面上页不显示了，所以提交时需要深拷贝一下进行提交
    //        let obj={
    //     ...this.form
    //     }

    //     // 上传文件，需要转换一下
    //     let data = new FormData();
    //     for(let i in obj){
    //       data.append(i,obj[i])
    //     }
    //     reqGoodsUpdate(data).then(res=>{
    //       if(res.data.code==200){
    //           this.info.isShow=false
    //           alertSuccess("修改成功")
    //           this.requestSeckillList()
    //       }
    //     })
    // },
    //   // 选择一级分类时
      changeFirst(){
        // 首先将二级分类置空，因为一级分类可能会变化
        this.form.second_cateid=""
        // 发请求  根据一级分类的id获取二级分类
        this.getSecondList()
       },
      getSecondList(){
         reqClassifyList({pid:this.form.first_cateid}).then(res=>{
          if(res.data.code==200){
            this.second_cate = res.data.list
          }
          
        })
      
      },
  // look(id){
  //   // this.form.description = this.editor.txt.html()
  //   reqOneGoods(id).then(res=>{
   
  //   // 返回来的数据赋值给form
  //     this.form=res.data.list
  //        // 补个id
  //   this.form.id=id
  //     //  获取二级分类
  //     this.getSecondList()
    
  //   })
  // },
  
  
  },
  mounted() {
      this.reqCateList();
      this.requestGoodList(true)
  },
};
</script>
<style lang="stylus"  scoped>
.add >>>.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>