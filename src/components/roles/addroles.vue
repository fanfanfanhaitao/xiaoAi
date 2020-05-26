<template>
 <div>
    <div class="button">
      <el-button type="primary"  @click="dialogFormVisible = true">添加角色</el-button>
    </div>
    <el-dialog title="添加角色" width="30%" :visible.sync="dialogFormVisible">
  <el-form :model="form" >
    <el-form-item label="角色名" :rules="name" :label-width="formLabelWidth">
      <el-input v-model="form.roleName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" :label-width="formLabelWidth">
       <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;

 export default {
   data () {
     return {
       formLabelWidth: '80px',
       dialogFormVisible:false,
       form:{roleName:'',roleDesc:''},
       name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "长度不少于3", trigger: "blur" }
        ],
     }
   },
   components: {

   },
   methods: {
   ...userActions(["addRole"]),
   add(){
    this.addRole({roleName:this.form.roleName,roleDesc:this.form.roleDesc})
    this.dialogFormVisible = false
    this.form.roleName=this.form.roleDesc=''
   }
   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.button {
  padding-bottom: 20px;
}
</style>