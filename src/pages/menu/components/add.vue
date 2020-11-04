<template>
  <div>
    <el-dialog :title="json.title" :visible.sync="json.isShow">
      <el-form :model="form">
        <!-- :label-width="formLabelWidth" -->
        <el-form-item label="菜单名称">
          <el-input
            class="name"
            v-model="form.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- :label-width="formLabelWidth" -->
        <el-form-item label="上级菜单">
          <el-select
            v-model="form.pid"
            placeholder="请选择菜菜单"
            @change="changePid"
          >
            <el-option v-if="url == ''" label="顶级菜单" :value="0">
              <span>顶级菜单</span>
            </el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
            <!--循环请求回来渲染 -->
          </el-select>
        </el-form-item>
        <!-- :label-width="formLabelWidth" -->
        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <!-- :label-width="formLabelWidth" -->

        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option value="el-icon-setting">
              <i class="el-icon-setting"></i>
            </el-option>
            <el-option value="el-icon-video-camera-solid">
              <i class="el-icon-video-camera-solid"></i>
            </el-option>
            <el-option value="el-icon-s-flag">
              <i class="el-icon-s-flag"></i>
            </el-option>
            <el-option value="el-icon-share">
              <i class="el-icon-share"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-if="form.type == 2">
          <el-select v-model="form.url" placeholder="请选择">
            <div v-for="item in indexRouters" :key="item.path">
              <el-option
                v-if="item.path !== 'home'"
                :label="item.name"
                :value="'/' + item.path"
              ></el-option>
            </div>
          </el-select>
        </el-form-item>

        <!-- :label-width="width" -->
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="json.isShow = false">取 消</el-button>
        <el-button type="primary" v-if="json.btn == '添加'" @click="add"
          >添加</el-button
        >
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqAddList, reqOneList, reqUpdateList } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { indexRouters } from "../../../router/index";
import { alertSuccess, alertWarning } from "../../../util/alert";
import { resolve } from "url";
export default {
  props: ["json"],
  computed: {
    ...mapGetters({
      list: "list/list",
    }),
  },
  data() {
    return {
      url: "",
      indexRouters: indexRouters,
      form: {
        pid: "",
        title: "",
        icon: "",
        url: "",
        status: 1,
        type: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqMenuList: "list/reqMenuList",
    }),
    changePid() {
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    look(id, url) {
      reqOneList({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
      this.url = url;
    },
    checked() {
      return new Promise((resolve, reject) => {
        if (this.form.title == "") {
          alertWarning("请填写菜单名称");
          return;
        }
        if (this.form.pid === "") {
          alertWarning("请选择上级菜单");
          return;
        }
        if (this.form.pid == 0 && this.form.icon == "") {
          alertWarning("请选择图标");
          return;
        }
        if (this.form.pid !== 0 && this.form.url == "") {
          alertWarning("请选择地址");
          return;
        }
        resolve();
      });
    },
    update() {
      this.json.isShow = false;
      reqUpdateList(this.form).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.reqMenuList();
        } else {
          alertWarning(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        url: "",
        status: 2,
        type: 1,
      };
    },
    add() {
      this.checked().then(() => {
        reqAddList(this.form).then((res) => {
          this.json.isShow = false;
          this.reqMenuList();
          if (res.data.code == 200) {
            alertSuccess(res.data.msg);
          } else {
            alertWarning(res.data.msg);
          }
        });
      });
    },
  },

  mounted() {},
};
</script>
<style scoped>
.name {
  width: 400px;
}
.el-form {
  margin-left: 40px;
}
</style>
