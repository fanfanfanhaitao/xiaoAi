<template>
 <div>
    <el-form :model="form" >
      <el-form-item label="商品名称" :rules="name"  :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="商品价格" :rules="name"  :label-width="formLabelWidth">
        <el-input v-model="form.price" type="number" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="商品重量" :rules="name"  :label-width="formLabelWidth">
        <el-input v-model="form.number" type="number" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="商品数量" :rules="name"  :label-width="formLabelWidth">
        <el-input v-model="form.weight" type="number" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="商品分类"  :label-width="formLabelWidth">
           <el-cascader class="cascader"
        v-model="value"
        :options="categories"
        :props="{expandTrigger: 'hover',value:'cat_id',label:'cat_name',children: 'children'}"
        @change="handleChange"
      ></el-cascader>
      </el-form-item>
      
    </el-form>
 </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
 export default {
   data () {
     return {
      name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "长度不少于3", trigger: "blur" }
        ],
      formLabelWidth:'120px',
      form:{name:'',price:'',number:'',weight:''},
      value: [],
     }
   },
   components: {

   },
   methods: {
      ...userActions(["getCategories"]),
       handleChange(value) {
       console.log(value);
    },
   },
   mounted() {
       this.getCategories({type:'',pagenum:'',pagesize:''});
   },
   watch: {

   },
   computed: {
     ...userState(["categories"])
   }
 }
</script>

<style scoped lang='scss'>
 .cascader{
        width: 35%;
    }
</style>