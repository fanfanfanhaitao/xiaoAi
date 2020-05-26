<template>
  <div>
    <el-alert title="注意:只允许为第三级分类设置相关参数!" type="warning"  :closable="false" show-icon></el-alert>
    <div class="m-top2">
      选择商品分类:
      <el-cascader class="cascader"
        v-model="value"
        :options="categories"
        :props="{expandTrigger: 'hover',value:'cat_id',label:'cat_name',children: 'children'}"
        @change="handleChange"
      ></el-cascader>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="m-top2">
    <el-tab-pane label="动态参数" name="first"><dynamic v-bind:many="this.many"></dynamic></el-tab-pane>
    <el-tab-pane label="静态属性" name="second"><attribute v-bind:many="this.many"></attribute></el-tab-pane>
   
  </el-tabs>
  </div>
</template>

<script>
import dynamic from '../../components/params/dynamic';
import attribute from '../../components/params/attribute'
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  data() {
    return {
      value: [],
      activeName: 'first',
      sel:'many',
      many:[]
     
    };
  },
  components: {dynamic,attribute},
  methods: {
    ...userActions(["getCategories"]),
    ...userActions(["getAttributes"]),
    handleChange(value) {
      this.many=value
      this.getAttributes({id:value[value.length-1],sel:this.sel})
    },
    handleClick(tab, event) {
        if(tab.name=='second'){
          this.sel='only'
         
        }else if(tab.name=='first'){
          this.sel='many'
        }
         this.getAttributes({id:this.many[this.many.length-1],sel:this.sel})
       
      }
  },
  mounted() {
    this.getCategories({type:'',pagenum:'',pagesize:''});
  },
  watch: {},
  computed: {
    ...userState(["categories"])
  }
};
</script>

<style scoped lang='scss'>
    .cascader{
        margin-left: 20px;
    }

</style>