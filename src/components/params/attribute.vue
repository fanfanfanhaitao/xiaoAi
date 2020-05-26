<template>
  <div>
    <el-button type="primary" size="mini" :disabled="attributes.meta? false: true" @click="dialogFormVisible = true">添加属性</el-button>
    <el-dialog title="添加静态属性" width="30%" :visible.sync="dialogFormVisible">
  <el-form :model="form" >
    <el-form-item label="静态属性" :rules="name" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addParam">确 定</el-button>
  </div>
</el-dialog>
    <el-table :data="attributes.data" style="width: 100%">
      <el-table-column type="index" label="#" align="center" width="50"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag size="medium" v-if="scope.row.attr_vals!==''" closable>{{scope.row.attr_vals}}</el-tag>
          <el-tag :key="tag"
            size="medium"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </template>
      </el-table-column>
      <el-table-column label="参数名称" prop="attr_name" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
         <el-button type="primary" size="mini" icon="el-icon-edit" @click="editPara(scope.row)">编辑</el-button>
         <el-button type="danger" size="mini" icon="el-icon-delete" @click="delePara(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改静态属性" width="30%" :visible.sync="dialogVisible">
  <el-form :model="formDynamic" >
    <el-form-item label="静态属性" :rules="name" :label-width="formLabelWidth">
      <el-input v-model="formDynamic.attr_name" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="edit">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      dialogFormVisible:false,
      form:{name:''},
      formLabelWidth:'80px',
       name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "长度不少于3", trigger: "blur" }
        ],
       sel:'only', 
       dialogVisible:false,
       formDynamic:{name:''}
    };
   
  },
  props: {
    many:{
        type:Array,
        value:[]
    }
  },
  components: {},
  methods: {
    ...userActions(["addAttributes"]),
    ...userActions(["editAttributes"]),
    ...userActions(["deleAttributes"]),
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    addParam(){
        this.addAttributes({id:this.many[this.many.length-1],attr_name:this.form.name,sel:this.sel,attr_sel:this.sel})
        this.dialogFormVisible = false
    },
    editPara(e){
        console.log(e);
        this.formDynamic=JSON.parse(JSON.stringify(e))
        this.dialogVisible = true
    },
    edit(){
        this.editAttributes({id:this.many[this.many.length-1],attrId:this.formDynamic.attr_id,attr_name:this.formDynamic.attr_name,sel:this.sel,attr_sel:this.sel})
        this.dialogVisible = false
    },
    delePara(e){
     
      this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         this.deleAttributes({id:this.many[this.many.length-1],attrId:e.attr_id,sel:this.sel})
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      
    }

  },
  mounted() {
     
  },
  watch: {},
  computed: {
    ...userState(["attributes"])
  }
};
</script>

<style scoped lang='scss'>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>