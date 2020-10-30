<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="mwidth">
          <el-select v-model="form.first_cateid" placeholder="请选择一级分类" @change="changeFirst" >
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

        <el-form-item label="商品名称" :label-width="mwidth">
          <el-input
            v-model="form.goodsname"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="mwidth">
          <el-input
        
            v-model="form.price"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="mwidth">
          <el-input
            v-model="form.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>


        <el-form-item label="图片" :label-width="mwidth">
          <el-upload
            class="avatar-uploader" :on-change="changeFile" action="#" :show-file-list="false">
            <img v-if="imageUrl"  :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="mwidth">
          <el-select v-model="form.specsid" placeholder="请选择商品规格" @change="changeSpec">
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="mwidth">
          <el-select v-model="form.specsattr" placeholder="请选择规格属性" multiple>
            <el-option
              v-for="(item,index) in attrList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="mwidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="mwidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <!-- :label-width="width" -->
        <el-form-item label="状态" :label-width="mwidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

         <el-form-item label="状态" :label-width="mwidth">
             <textarea v-model="form.description"  cols="30" rows="10"></textarea>
        </el-form-item>




      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" v-if="info.title == '商品添加'" @click="add">添加</el-button>

        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import {reqClassifyList,reqSpecList,reqGoodsAdd,reqOneGoods} from "../../../util/request"
import {alertSuccess,alertWarning} from "../../../util/alert"
export default {
  props: ["info"],
  components: {},
  computed: {
    // 分类列表
      ...mapGetters({
           list:"classify/list",
           specList: "spec/list",
      })
  },
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        description:"",
        specsid:"",
        specsattr:"",
        isnew:1,
        ishot:1,
        status:1
      },
      // 照片地址
      imageUrl:"",
       mwidth: "120px",
      //  二级分类
      second_cate:[],
       //规格属性的list
      attrList:[],
    };
  },
  methods: {
      ...mapActions({
        //  商品列表
         requestGoodList:"goods/requestGoodList",
         reqCateList:"classify/reqCateList",
         requestSpecList: "spec/requestSpecList"
      }),
      // 上传照片时 使用on-change将照片转换成地址
       changeFile(file) {
        //  照片信息转换为地址
        this.imageUrl = URL.createObjectURL(file.raw);
        // 添加时传给后台的时form中的img  其信息为照片信息
        this.form.img = file.raw
       
      },
      // 表格置空
      empty(){
        this.form={
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        description:"",
        specsid:"",
        specsattr:"",
        isnew:1,
        ishot:1,
        status:1
      },
      this.imageUrl="",
      //  二级分类
      this.second_cate=[],
       //规格属性的list
      this.attrList=[]
      },
      // 添加按钮
      add(){

           let obj={
        ...this.form
        }
        obj.specsattr=JSON.stringify(obj.specsattr)

        // 上传文件，需要转换一下
        let data = new FormData();
        for(let i in obj){
          data.append(i,obj[i])
        }
        // /发请求
        reqGoodsAdd(data).then(res=>{
          if(res.data.code===200){
            this.info.isShow=false
              alertSuccess("添加成功")
              this.requestGoodList()
          }
        })
      },


      // 选择一级分类时
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
      // 改变商品规格时
      changeSpec(){
        // 规格属性先置空
        this.form.specsattr=[]
        // 商品规格中包含规格属性，所以找出商品规格中的id与选中的商品规格id相同赋值给Obj
        let obj = this.specList.find(item=>item.id===this.form.specsid)

        this.attrList =obj.attrs
      },
  look(id){
    reqOneGoods(id).then(res=>{

      this.form=res.data.list
    })
  }
  },
  mounted() {
      this.reqCateList();
      this.requestSpecList(true)
      // 获取商品规格
      // reqSpecList({}).then(res=>{
      //   console.log("商品规格")
      //   console.log(this.specList)
      //   this.specList = res.data.list
      // })
  },
};
</script>
    <!--   -->
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