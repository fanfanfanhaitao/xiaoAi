<template>
  <div class="m-top2">
    <el-table
      :data="users.users"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" label="#" align="center" width="100"></el-table-column>
      <el-table-column prop="username" label="姓名" align="center" width="200"></el-table-column>
      <el-table-column prop="role_name" label="角色" align="center" width="200"></el-table-column>
      <el-table-column prop="mobile" label="电话" align="center" width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" width="200"></el-table-column>

      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="modefy(scope.row)"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="210">
        <template slot-scope="scope">
          <el-tooltip content="编辑角色" placement="top">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除角色" placement="top">
            <el-button
              type="danger"
              @click="deleuser(scope.row.id)"
              size="mini"
              icon="el-icon-delete"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="分配角色" placement="top">
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="distribution(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div></div>
    <el-dialog title="编辑用户" width="40%" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :rules="rulesform.email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :rules="rulesform.phone">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edituser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配用户" width="40%" :visible.sync="dialogVisible">
      <div>当前用户:{{form.username}}</div>
      <div class="m-top2">当前角色:{{form.role_name}}</div>
    <div style="margin-top: 15px;">
      <el-select v-model="select" slot="append" placeholder="请选择" @change="handle">
        <el-option v-for="(item,index) in rolist" :key="index" :label="item.roleName" :value="item.id"></el-option>
      </el-select>
   </div>                                      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="disuser">确 定</el-button>
      </div>
    </el-dialog>
    <div class="m-top2">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="users.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="users.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  data() {
    return {
      pagenum: 1,
      pagesize: 5,
      dialogFormVisible: false,
      dialogVisible: false,
      form: {},
      select:'',
      rid:'',
      rulesform: {
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
  components: {},
  methods: {
    ...userActions(["deleteUser"]),
    ...userActions(["getUsers"]),
    ...userActions(["modeType"]),
    ...userActions(["editUser"]),
    ...userActions(["roleList"]),
    ...userActions(["distributionUser"]),
    handleSizeChange(val) {
      this.pagesize = val;
       this.getUsers({ pagenum: this.pagenum, pagesize: this.pagesize });
    },
    handleCurrentChange(val) {
      this.pagenum = val;
       this.getUsers({ pagenum: this.pagenum, pagesize: this.pagesize });
    },
    deleuser(e) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteUser({id:e,pagenum: this.pagenum, pagesize: this.pagesize });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    modefy(e) {
      this.modeType(e.id, e.mg_state);
    },
    edit(e) {
      this.dialogFormVisible = true;
      
      this.form = JSON.parse(JSON.stringify(e));
    },
    edituser() {
      this.editUser({
        id: this.form.id,
        email: this.form.email,
        mobile: this.form.mobile,
        pagenum: this.pagenum, 
        pagesize: this.pagesize 
      });
      this.dialogFormVisible = false;
      
     
    },
    distribution(e) {
      this.dialogVisible = true;
      this.form =JSON.parse(JSON.stringify(e));
      console.log(e);
    },
   handle(e){
     this.rid=e
      
    },
    disuser(){
       this.distributionUser({id:this.form.id,rid:this.rid,pagenum: this.pagenum,pagesize: this.pagesize })
       this.dialogVisible = false;
     
    }
  
  },
  mounted() {
    this.getUsers({pagenum: this.pagenum, pagesize: this.pagesize });
    this.roleList()
    
  },
  watch: {},
  computed: {
    ...userState(["users"]),
    ...userState(["rolist"])
  }
};
</script>

<style scoped lang='scss'>
  .input{
    width: 30%;
  }
</style>