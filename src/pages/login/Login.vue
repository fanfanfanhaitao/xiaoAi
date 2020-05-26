`<template>
<div class="content">
 <el-card class="box-card">
  <div class="form">
     <div class="font">欢迎来到小爱后台管理系统</div>
    <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="请输入用户名" prop="username" :rules="Form.name">
    <el-input v-model.number="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="请输入密码" prop="pass" :rules="Form.password">
    <el-input type="pass word" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  </el-form>
   <div>
     特别提醒: 如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。
   </div>
   <div class="button">
     <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
   </div>

  </div>
 </el-card>
 </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const userModule = createNamespacedHelpers('user')
const {mapActions:userActions} = userModule
export default {
  name: '',
  props: {
  },
  components: {

  },
  data() {
    return {
        ruleForm: {
          username:'',
          pass: '',
        },
        Form:{   
          name: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, message: "长度不少于3", trigger: "blur" }
      ],
      password:[
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 3, message: "长度不少于3", trigger: "blur" }
      ],
      }
       
        
        
    }
  },
  methods: {
    ...userActions(['login']),   
     submitForm(){
       this.login({
         username:this.ruleForm.username,
         password:this.ruleForm.pass
       })
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

.content{
  display: flex;
  height: calc(100vh)!important;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/images/timg.jpg');
  background-size: 100% 100%;
}
.demo-ruleForm{
  margin-top: 20px;
  width: 80%;
}
.font{
    font-size: 24px;
    font-weight: 700;
    height: 80px;
    border-bottom: 1px solid #ebeef5;
    line-height: 80px;
    text-align: center;
   
}
.button{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>