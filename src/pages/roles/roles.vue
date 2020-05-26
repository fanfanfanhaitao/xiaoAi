<template>
  <div>
    <addroles></addroles>
    <el-table :data="rolist" border stripe style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          
          <div v-for="(item,index) in props.row.children" :key="index" class="props">
           <div class="props-item">
             <div class="item">
               <el-tag closable class="icon">{{item.authName}}</el-tag>
               <i class="el-icon-caret-right"></i>
             </div>
             <div class="roles">
              <div v-for="(item1,index1) in item.children" :key="index1" class="item1">
                <div class="item">
                <el-tag closable type="success" class="icon">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
                </div>
                 <div v-for="(item2,index2) in item1.children" :key="index2" class="item2">
                   <el-tag closable type="warning" class="icon" v-if="index2<6">{{item2.authName}}</el-tag>
                </div>
            </div>
            </div>
           </div>
        </div>
          
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" align="center" width="50"></el-table-column>
      <el-table-column label="职位" prop="roleName" align="center" width="384"></el-table-column>
      <el-table-column label="描述" prop="roleDesc" align="center" width="384"></el-table-column>
      <el-table-column label="操作" prop="desc" align="center" width="384">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleRole(scope.row)">删除</el-button>
          <el-button type="warning" size="mini" @click="assign(scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  <el-dialog title="编辑角色" width="30%" :visible.sync="dialogFormVisible">
  <el-form :model="form" >
    <el-form-item label="角色名" :rules="name" :label-width="formLabelWidth">
      <el-input v-model="form.roleName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" :label-width="formLabelWidth">
       <el-input v-model="roleDesc" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editRoles">确 定</el-button>
  </div>
</el-dialog>
  <el-dialog title="分配权限"  :visible.sync="dialogVisible">
    <el-tree
  :data="rList"
  show-checkbox
  node-key="id"
  default-expand-all
  :props="defaultProps">
</el-tree>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import addroles from '../../components/roles/addroles'
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  data() {
    return {
       dialogFormVisible:false,
       form:{},
       roleDesc:'',
       name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "长度不少于3", trigger: "blur" }
        ],
      formLabelWidth: '80px',
      dialogVisible:false,
      type:'tree',
      defaultProps: {
          children: 'children',
          label: 'authName'
        }
    };
  },
  components: {
    addroles
  },
  methods: {
    ...userActions(["roleList"]),
    ...userActions(["deleteRole"]),
    ...userActions(["editRole"]),
    ...userActions(["rightList"]),
    deleRole(e){
       this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRole(e.id)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(e){
      this.dialogFormVisible = true
      this.form=JSON.parse(JSON.stringify(e));
      console.log(e);
    },
    editRoles(){
      this.editRole({id:this.form.id,roleName:this.form.roleName,roleDesc:this.roleDesc})
      this.dialogFormVisible = false
    },
    assign(e){
      console.log(e);
      this.dialogVisible=true
    }
  },
  mounted() {
    this.roleList();
    this.rightList(this.type)
  },
  watch: {},
  computed: {
    ...userState(["rolist"]),
    ...userState(["rList"]),
  }
};
</script>

<style scoped lang='scss'>

.props{
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #EEEEEE;
  display: flex;
  align-items: center;

 
}
.props-item{
   display: flex;
   align-items: center;
 
}
.item{
  display: flex;
  width: 200px;
  align-items: center;
}
.item1{
  display: flex;
  height: 60px;
  align-items: center;
 
  
}
.icon{
  margin-right: 10px;
}
.item2{
  display: flex;
  flex-wrap: wrap;
}

</style>