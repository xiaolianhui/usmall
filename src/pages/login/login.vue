<template>
  <div class="box">
    <div class="con">
      <h2>登录</h2>
      <el-input class="ipt" placeholder="请输入用户名" v-model="input" clearable> </el-input>
      <el-input class="ipt" placeholder="请输入密码" v-model="input" show-password></el-input>
      <input class="login" @click="login" type="button" value="登录" />
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    login(){
      this.$router.push("/index")
    }
  },
  mounted() {},
};
</script>
<style scoped>
.box {
  width: 100vw;
  height: 100vh;

  background: linear-gradient(to right, #563444, #2f3c5f);
  /* background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603202800811&di=4460c4a66c5942f2d1f851397be76123&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F180307%2F330855-1P30H3340062.jpg") no-repeat;   
        background-size:100%; */
}
.con {
  width: 500px;
  height: 300px;
  /* background: white; */
  border: 1px solid white;
  border-radius: 8px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -150px;
}
.ipt{
    width: 320px;
   height: 40px;
   margin-top: 25px;
  
}
input {
  width: 320px;
  height: 40px;
  border-radius: 4px;
  margin-top: 25px;
  outline: none;
  border: 1px solid #333;
   border: none;
  background: #409eff;
  color: white;
  font-size: 16px;
}

h2 {
  margin-top: 30px;
  color: #409eff;
}
.login:hover {
  background: #1583f8;
}
</style>