<template>
 <div class="right">
<el-table
     :data="rList"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" label="#" align="center" width="130"></el-table-column>
      <el-table-column prop="authName" label="权限名称" align="center" width="560"></el-table-column>
       
      <el-table-column  label="权限等级" align="center" width="560">
          <template slot-scope="scope">
          <div v-if="scope.row.level==0"><el-tag>一级</el-tag></div>
          <div v-if="scope.row.level==1"><el-tag type="success">二级</el-tag></div>
          <div v-if="scope.row.level==2"><el-tag type="warning">三级</el-tag></div>
            </template>
      </el-table-column>
    
    </el-table>
 </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
 export default {
   data () {
     return {
       type:'list'
     }
   },
   components: {

   },
   methods: {
     ...userActions(["rightList"]),
   },
   mounted() {
      this.rightList(this.type)
   },
   watch: {

   },
   computed: {
      ...userState(["rList"]),
   }
 }
</script>

<style scoped lang='scss'>

</style>