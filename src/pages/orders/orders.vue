<template>
  <div>
    <div class="search">
      <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
      <el-button icon="el-icon-search" @click="search"></el-button>
    </div>
    <el-table :data="orderList.goods" stripe border style="width: 100%">
      <el-table-column type="index" label="#" align="center" width="100"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" align="center" width="210"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" align="center" width="180"></el-table-column>
      <el-table-column label="是否付款" align="center">
        <el-tag type="danger">已付款</el-tag>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" align="center"></el-table-column>
      <el-table-column prop="create_time" label="下单时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="dialog = true"></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-location"
            @click="location(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="Number(orderList.pagenum)"
      :page-sizes="[5, 15, 20, 30]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="orderList.total"
    ></el-pagination>
    <el-dialog title="编辑地址"  :visible.sync="dialog">
      
          <el-cascader class="cascader"
            :options="cityOptions"
            :value="city"
            @change="changeProvince"
            clearable
          ></el-cascader>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看物流" :visible.sync="dialogFormVisible">
      <el-steps direction="vertical" :space=60 :active="1" process-status="wait" finish-status="process">
        <el-step v-for="(item,index) in kuaidi" :key="index"  :description="item.time">
       <template slot="title">
         <div class="title"> {{item.context}}</div>
      </template></el-step>
      </el-steps>
    </el-dialog>
  </div>
</template>

<script>
import cityOptions from "../../global/city_data2017_element";
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  data() {
    return {
      cityOptions: cityOptions,
      pagenum: 1,
      pagesize: 5,
      input: "",
      dialogFormVisible: false,
      dialog:false,
      city:[]
    };
  },
  components: {},
  methods: {
    ...userActions(["getOrders"]),
    ...userActions(["getKuaidi"]),
  sure(){
    this.dialog = false
    this.city=[]
  },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getOrders({ pagenum: this.pagenum, pagesize: this.pagesize });
    },
    changeProvince(e) {
      console.log(e);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getOrders({ pagenum: this.pagenum, pagesize: this.pagesize });
    },
    search() {
      this.getOrders({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.input
      });
    },
    location() {
     
      this.dialogFormVisible=true
      this.getKuaidi();
    }
  },
  mounted() {
    this.getOrders({ pagenum: this.pagenum, pagesize: this.pagesize });
  },
  watch: {},
  computed: {
    ...userState(["orderList"]),
     ...userState(["kuaidi"])
   
  }
};
</script>

<style scoped lang='scss'>
.search {
  width: 30%;
  display: flex;
  padding-bottom: 20px;
}
.cascader{
  width: 100%;
}
.title{
  font-size: 14px;
  font-weight: 100;
  z-index: 999;
}
</style>