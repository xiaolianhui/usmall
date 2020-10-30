<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择分类">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key = "item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="form.pid!==0" label="照片" :label-width="formLabelWidth">
          <div class="fileBox">
            <h3>+</h3>
            <input type="file" v-if="info.isShow" @change="changeFile" />
            <img v-if="imgUrl" :src="imgUrl" alt="" />
          </div>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" v-if="info.title=='分类添加'"  @click="add">添 加</el-button>
        <el-button type="primary" v-else  @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {reqClassifyAdd,reqOneClassify,reqClassifyUpdate} from "../../../util/request"
import {alertSuccess,alertWarning} from "../../../util/alert"
import {mapActions,mapGetters} from "vuex"
export default {
    props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list:"classify/list"
    })
  },
  data() {
    return {
        
      formLabelWidth: "120px",
      form: {
        pid:"",
        catename: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  methods: {
    ...mapActions({
      reqCateList:"classify/reqCateList"
    }),
    changeFile(e) {

      console.log(e.target.files[0].name)

      let file = e.target.files[0];
      if(file.size>2*1024*1024){
        alertWarning("照片大小不能大于2M")
        return
      }

      let imgArr = [".png",".img",".gif",".jpg",".jpeg"]
      let extname = file.name.slice(file.name.lastIndexOf("."))
      // console.log(extname)
      if(!imgArr.includes(extname)){
        alertWarning("请输入正确的照片格式")
        return
      }


      //   e就是上传文件的信息
      //  e.target.files[0]就是上传的文件
    
      //   将文件解析为地址
      this.imgUrl = URL.createObjectURL(file);
      // console.log(this.imgUrl)
    // 将文件赋值给form中的img
      this.form.img = file;
      // console.log(this.form.img)
    },
    empty(){
        this.form = {
        pid:"",
        catename: "",
        img: null,
        status: 1,
      },
      this.imgUrl = ""
    },

    add(){
        let data = new FormData();
        for(let i in this.form){
            data.append(i,this.form[i])
        }
        reqClassifyAdd(data).then(res=>{
            if(res.data.code===200){
                this.info.isShow =false;
                alertSuccess("添加成功")
                this.empty()
                this.reqCateList({istree:true})
            }
        })
    },
    look(id){
      reqOneClassify(id).then(res=>{
        
        this.form = res.data.list
        // 想要在页面上显示，要加上this.$imgPre即http://localhost:3000
        // this.imgUrl = this.$imgPre + res.data.list.img
        this.imgUrl = this.$imgPre + this.form.img
        // 获取的res没有id，需要给form加上一个id
        this.form.id = id
        
      })
    },
    update(){
    let Updata = new FormData();
    for(let i in this.form){
      Updata.append(i,this.form[i])
    }
      reqClassifyUpdate(Updata).then(res=>{
       
        if(res.data.code==200){
          alertSuccess("修改成功")
            this.empty()
            this.reqCateList({istree:true})
            this.info.isShow =false;
          }else{
            alertWarning(res.data.msg)
          }
      })
    }
  },
  mounted() {},
};
</script>
<style scoped>
.fileBox {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  position: relative;
}
.fileBox h3 {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100px;
  color: #666;
}
.fileBox input {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
}
.fileBox img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
</style>