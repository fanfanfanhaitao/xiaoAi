<template>
  <div>
    <div class="step">
      <el-alert title="添加商品信息" type="info" center :closable="false" show-icon></el-alert>
      <el-steps :active="Number(active)" finish-status="success" class="tab">
        <el-step v-for="(item,index) in data" :key="index" :title="item.name"></el-step>
      </el-steps>
    </div>
    <div class="float">
      <el-tabs tab-position="left" class="tab" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="0">
          <el-form :model="form">
            <el-form-item label="商品名称" :rules="name" :label-width="formLabelWidth">
              <el-input v-model="form.goodname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" :rules="name" :label-width="formLabelWidth">
              <el-input v-model="form.price" type="number" autocomplete="off" :disabled="this.form.goodname!=''?false:true"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" :rules="name" :label-width="formLabelWidth">
              <el-input v-model="form.number" type="number" autocomplete="off" :disabled="this.form.price!=''?false:true"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" :rules="name" :label-width="formLabelWidth">
              <el-input v-model="form.weight" type="number" autocomplete="off" :disabled="this.form.number!=''?false:true"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" :label-width="formLabelWidth">
              <el-cascader
                class="cascader"
                v-model="value"
                :options="categories"
                :disabled="this.form.weight!=''?false:true"
                :props="{expandTrigger: 'hover',value:'cat_id',label:'cat_name',children: 'children'}"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-form>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <div v-for="(item,index) in attributes.data" :key="index">
            <div>{{item.attr_name}}</div>
            <el-tag size="medium">{{item.attr_vals}}</el-tag>
          </div>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">
          <div>暂无属性</div>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <div id="main">
            <mavon-editor v-model="edit" />
          </div>
          <el-button style="margin-top: 12px;" @click="addgood">提交</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import message from "../../components/addgoods/message";
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  data() {
    return {
      active: 0,
      activeName: "0",
      data: [
        { name: "基本信息" },
        { name: "商品参数" },
        { name: "商品属性" },
        { name: "商品图片" },
        { name: "商品内容" },
        { name: "完成" }
      ],
      name: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, message: "长度不少于3", trigger: "blur" }
      ],
      formLabelWidth: "120px",
      form: { goodname: "", price: "", number: "", weight: "" },
      value: [],
      edit:''
    };
  },
  components: { message },
  methods: {
    ...userActions(["getAttributes"]),
    ...userActions(["addGoods"]),
    next() {
      // if (this.active++ > 2) this.active = 0;
      if (this.active < 5) {
        this.active++;
      } else {
        this.active = 0;
      }
      this.activeName = String(this.active);
    },
    ...userActions(["getCategories"]),
    handleChange(value) {
      this.getAttributes({ id: value[value.length - 1], sel: "many" });
     
    },
    handleClick(tab, event) {
      console.log(tab.index);
      this.active = tab.index;
    },
    addgood(){
      let arr =JSON.stringify(this.value)
      console.log(this.form);
      this.addGoods({goods_name:this.form.goodname,goods_price:this.form.price,goods_number:this.form.number,goods_weight:this.form.weight
     ,goods_cat:arr,attrs:this.attributes.data,goods_introduce:this.edit})
    }
  },
  mounted() {
    this.getCategories({ type: "", pagenum: "", pagesize: "" });
  },
  watch: {},
  computed: {
    ...userState(["categories"]),
    ...userState(["attributes"])
  }
};
</script>

<style scoped lang='scss'>
.step {
  margin-left: 150px;
}

.tab {
  margin-top: 20px;
}
.cascader {
  width: 35%;
}
</style>