<template>
 <div>
    <div class="button">
      <el-button type="primary" @click="add">添加分类</el-button>
    </div>
    <zk-table
     :data="categories.result"
     ref="table"
      sum-text="sum"
      index-text="#"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      :selection-type="props.selectionType">
    >
    <template slot="success" >
        <i class="el-icon-success" style="color:skyblue;"></i>
    </template>
     <template slot="sort" scope="scope">
        <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
        <el-tag type="success" v-else-if="scope.row.cat_level==1">二级</el-tag>
        <el-tag type="warning" v-else-if="scope.row.cat_level==2">三级</el-tag>
    </template>
      <template slot="operation" scope="scope">
         <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
         <el-button type="danger" size="mini" icon="el-icon-delete" @click="dele(scope.row)">删除</el-button>
    </template>
    </zk-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="Number(categories.pagenum)"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="categories.total"
    ></el-pagination>
 <el-dialog title="添加分类" width="35%" :visible.sync="dialog">
    <el-form  >
    <el-form-item label="分类名称" :rules="name"  :label-width="formLabelWidth">
      <el-input v-model="input" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="父级分类"   :label-width="formLabelWidth">
     <el-cascader class="cascader"
        v-model="value"
        :options="cate.result"
        :disabled="input!==''? false: true"
        
        :props="{expandTrigger: 'click', checkStrictly: true ,value:'cat_id',label:'cat_name',children: 'children'}"
        @change="handleChange"
      ></el-cascader>
       </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog = false">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
  </div>
</el-dialog>

  <el-dialog title="编辑分类"  :visible.sync="dialogVisible">
    <el-form :model="form" >
    <el-form-item label="分类名称" :rules="name"  :label-width="formLabelWidth">
      <el-input v-model="form.cat_name" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editCate">确 定</el-button>
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
          props: {
          stripe: false,
          border: true,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: true,
          treeType: true,
          isFold: true,
          expandType: false,
          selectionType: false,
        },
      columns:[{label:'分类名称',prop:'cat_name'},
             {label:'是否有效',align:'center',headerAlign:'center',type: 'template',template: 'success',},
             {label:'排序',align:'center',headerAlign:'center',type: 'template',template: 'sort',},
             {label:'操作',align:'center',headerAlign:'center',type: 'template',template: 'operation',}
         
      ],
       name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "长度不少于3", trigger: "blur" }
        ],
      pagenum: 1,
      pagesize: 5,
      dialogVisible:false,
      formLabelWidth:'120px',
      form:{},
      input:"",
      dialog:false,
      value:'',
      arr:[]
     }
   },
   components: {
     
   },
   methods: {
     ...userActions(["getCategories"]),
     ...userActions(["editCategories"]),
     ...userActions(["deleteCategories"]),
     ...userActions(["addCategories"]),
     
      handleSizeChange(val) {
      this.pagesize = val;
      this.getCategories({type:3,pagenum:this.pagenum,pagesize:this.pagesize})
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getCategories({type:3,pagenum:this.pagenum,pagesize:this.pagesize})
    },
     handleChange(value) {
        this.arr=value
        console.log(value);
     
    },
    edit(e){
        console.log(e);
        this.form=JSON.parse(JSON.stringify(e))
        this.dialogVisible=true
    },
    editCate(){
        this.editCategories({id:this.form.cat_id,cat_name:this.form.cat_name,type:3,pagenum:this.pagenum,pagesize:this.pagesize})
         this.dialogVisible=false
    },
    dele(e){
        this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            this.deleteCategories({id:e.cat_id,type:3,pagenum:this.pagenum,pagesize:this.pagesize})
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        }); 
    },
    add(){
        this.dialog=true
    },
    addCate(){
          this.dialog=false
          this.addCategories({cat_pid:this.arr[this.arr.length-1],cat_name:this.input,cat_level:this.arr.length,type:3,pagenum:this.pagenum,pagesize:this.pagesize})
          this.value=""
    }
   },
   mounted() {
        this.getCategories({type:3,pagenum:this.pagenum,pagesize:this.pagesize})
   },
   watch: {
       input(){
        if(this.input!==''){
            this.getCategories({type:2,pagenum:this.pagenum,pagesize:this.pagesize})
           }
       }
       
     
   },
   computed: {
     ...userState(["categories"]),
     ...userState(["cate"]),
   }
 }
</script>

<style scoped lang='scss'>
.button {
  padding-bottom: 20px;
}
.cascader{
    width: 100%;
}
</style>