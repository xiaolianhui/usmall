<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择角色">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" v-if="info.act == '添加'" @click="add"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqMangerAdd,
  reqOneManger,
  reqMangerEdit,
} from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";

export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  data() {
    return {
      dialogFormVisible: true,
      formLabelWidth: "120px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: "",
      },
    };
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestRoleList",
    }),
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    checked() {
      return new Promise((resolve, rejece) => {
        if (this.form.roleid == "") {
          alertWarning("请选择角色");
          return;
        }
        if (this.form.username == "") {
          alertWarning("请输入用户名");
          return;
        }
        if (this.form.password == "") {
          alertWarning("请输入密码");
          return;
        }
        resolve();
      });
    },
    add() {
      this.checked().then(() => {
        reqMangerAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            this.info.isShow = false;
            alertSuccess("添加成功");
            this.empty();
            this.$emit("init");
          } else {
            alertWarning(res.data.msg);
          }
        });
      });
    },
    look(uid) {
      reqOneManger(uid).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
        }
        this.form.password = "";
      });
    },
    update() {
      this.checked().then(()=>{
         reqMangerEdit(this.form).then((res) => {
        if (res.data.code === 200) {
          alertSuccess("修改成功");
          this.info.isShow = false;
          this.empty();
          this.$emit("init");
        } else {
          alertWarning("修改失败");
        }
      });
      })
     
    },
  },
  mounted() {
    this.requestRoleList();
  },
};
</script>
<style scoped>
</style>