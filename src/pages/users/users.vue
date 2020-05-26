<template>
  <div>
      <div class="card-body">
        <div class="search">
          <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
          <el-button icon="el-icon-search" @click="search"></el-button>
          <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
        </div>
        <div class="btn">
          <el-dialog title="添加用户" width="40%" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="80px" class="demo-ruleForm">
              <el-form-item label="用户名" :rules="rulesform.name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :rules="rulesform.password">
                <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :rules="rulesform.email">
                <el-input v-model="form.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" :rules="rulesform.phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="add">确 定</el-button>
            </div>
          </el-dialog>
        </div>

        <tableUser></tableUser>
      </div>
    
  </div>
</template>

<script>
import tableUser from "../../components/users/tableUser";
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  data() {
    return {
      input: "",
      eVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        password: "",
        email: "",
        phone: ""
      },
      rulesform: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "长度不少于3", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度不少于6位", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 6, message: "长度不少于6位", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, message: "请输入正确手机号", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    tableUser
  },
  methods: {
    ...userActions(["addUser"]),
    ...userActions(["getUsers"]),

   search(){
      this.getUsers({pagenum:1,pagesize:5,query:this.input})
  },
     add() {
      this.addUser({
        username: this.form.name,
        password: this.form.password,
        email: this.form.email,
        mobile: this.form.phone,
        pagenum:1,
        pagesize:5
      });
       this.form.name=this.form.password=this.form.email=this.form.phone=''
       this.dialogFormVisible = false   
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box-card {
  margin-top: 20px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
}
.card-body {
  padding: 20px;
}
.search {
  display: flex;
  width: 40%;
}
</style>