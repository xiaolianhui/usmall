<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqOneMember, reqEditMember } from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";
export default {
  components: {},
  data() {
    return {
      formLabelWidth: "100px",
      dialogFormVisible: false,
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: "",
      },
    };
  },
  methods: {
    look(uid) {
      this.dialogFormVisible = true;
      reqOneMember(uid).then((res) => {
        this.form = res.data.list;
        this.form.uid = uid;
        this.form.password = "";
      });
    },
    checked() {
      return new Promise((resolve, rejece) => {
        if (this.form.nickname == "") {
          alertWarning("昵称不能为空");
          return;
        }
        if (this.form.phone == "") {
          alertWarning("手机号不能为空");
          return;
        }
        if (this.form.password == "") {
          alertWarning("请输入密码");
          return;
        }
        resolve();
      });
    },
    update() {
      this.checked().then(() => {
        this.dialogFormVisible = false;
        reqEditMember(this.form).then((res) => {
          if (res.data.code === 200) {
            alertSuccess("修改成功");
            this.$emit("init");
          } else {
            alertWarning("修改失败");
          }
        });
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>