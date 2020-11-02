<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <!-- :label-width="formLabelWidth" -->
        <el-form-item label="活动名称">
          <el-input
            class="name"
            v-model="form.rolename"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="'70px'">
          <el-tree
            class="tree"
            :data="list"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="活动区域">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cacel">取 消</el-button>
        <el-button v-if="info.btn == '1'" type="primary" @click="add"
          >添加</el-button
        >
        <el-button v-else type="primary" @click="edit">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqAddRole, reqOneRole, reqEditRole } from "../../util/request";
import { alertSuccess, alertWarning } from "../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "list/list",
    }),
  },
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 2,
      },
    };
  },
  methods: {
    ...mapActions({
      reqMenuList: "list/reqMenuList",
      requestRoleList: "role/requestRoleList",
    }),
    lookOne(id) {
      reqOneRole({ id: id }).then((res) => {
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    edit() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      this.checked().then(() => {
        reqEditRole(this.form).then((res) => {
          this.info.isShow = false;
          this.requestRoleList();
        });
      });
    },
    checked() {
      return new Promise((resolve, rejece) => {
        if (this.form.rolename == "") {
          alertWarning("角色名称不能为空");
          return;
        }
        if (this.form.menus == "[]") {
          alertWarning("请选择角色权限");
          return;
        }
        resolve();
      });
    },
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.checked().then(() => {
        reqAddRole(this.form).then((res) => {
          if (res.data.code == 200) {
            this.info.isShow = false;
            this.requestRoleList();
            alertSuccess(res.data.msg);
          } else {
            alertWarning(res.data.msg);
          }
        });
      });
    },
    cacel() {
      this.info.isShow = false;
    },
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 2,
      };
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([]);
      });
    },
  },
  mounted() {
    this.reqMenuList();
  },
};
</script>
<style scoped>
.name {
  width: 400px;
}
/* .tree {
  margin-left: 60px;
} */
</style>
