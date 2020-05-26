<template>
  <div>
    <div class="search">
      <el-input v-model="input" placeholder="请输入搜索内容" ></el-input>
      <el-button icon="el-icon-search" @click="search"></el-button>
      <el-button type="primary" @click="add">添加商品</el-button>
    </div>
    <el-table :data="goodsList.goods" style="width: 100%">
      <el-table-column type="index" label="#" align="center" ></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" align="center" width="600"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" align="center" ></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" align="center" ></el-table-column>
      <el-table-column prop="add_time" label="创建时间" align="center" width="180"></el-table-column>
      <el-table-column label="操作" align="center" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editGood(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleGood(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="Number(goodsList.pagenum)"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsList.total"
    ></el-pagination>
  <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
  <el-form :model="form" >
    <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="form.goods_name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" :label-width="formLabelWidth">
       <el-input type="number" v-model="form.goods_price"  autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品数量" :label-width="formLabelWidth">
       <el-input type="number" v-model="form.goods_number" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品重量" :label-width="formLabelWidth">
       <el-input type="number" v-model="form.goods_weight" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      input: "",
      pagenum: 1,
      pagesize: 10,
      formLabelWidth: '80px',
      dialogFormVisible:false,
      form:{}
    };
  },
  components: {},
  methods: {
    ...userActions(["getGoods"]),
    ...userActions(["deleteGoods"]),

    handleSizeChange(val) {
      this.pagesize = val;
       this.getGoods({ pagenum: this.pagenum, pagesize: this.pagesize });
    },
    handleCurrentChange(val) {
      this.pagenum = val;
       this.getGoods({ pagenum: this.pagenum, pagesize: this.pagesize });
    },
    search(){
      this.getGoods({ pagenum: this.pagenum, pagesize: this.pagesize,query:this.input });
    },
    add(){
      this.$router.push('addGoods'); 
    },
    editGood(e){
      this.form=e;
      this.dialogFormVisible=true
    },
    deleGood(e){
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        this.deleteGoods(e.goods_id)
        setTimeout(() =>{
            this.getGoods({pagenum: this.pagenum, pagesize: this.pagesize });
        },500);
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
    this.getGoods({ pagenum: this.pagenum, pagesize: this.pagesize });
  },
  watch: {},
  computed: {
    ...userState(["goodsList"])
  }
};
</script>

<style scoped lang='scss'>
.search {
  width: 40%;
  display: flex;
  padding-bottom: 20px;
}
</style>