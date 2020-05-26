<template>
  <div class="indexBar-box flex">
    <draggable class="flex" v-model="list" group="people" @start="drag=true" @end="drag=false">
      <div class="flex index-box" v-for="(item,index) in list" :key="index">
        <div class="flex item-box1" v-if="item.path===url" @click="goRouter(item.path)">
          <div class="yuan"></div>
          <div class="txt f12">{{item.meta.title}}</div>
          <i class="el-icon-close" @click="dele(item,index)"></i>
        </div>
        <div class="flex item-box2" v-else @click="goRouter(item.path)">
          <div class="txt f12">{{item.meta.title}}</div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "indexBar",
  props: {},
  data() {
    return {
      list: []
    };
  },
  computed: {
    url() {
      console.log();
      if(this.$route.path==='/'){
        return '/home'
      }
      else{
      return this.$route.path;
      }
      
    }
  },
  created() {},
  mounted() {
    this.list = [{ path: "/home", meta: { title: "首页" } }];
    if(localStorage.getItem("list")){
      this.list = JSON.parse(localStorage.getItem("list"));
    }
  },
  watch: {
    $route(to) {
      console.log(to);
      if (this.list.filter(item => item.path === to.path).length === 0&&to.path!=='/') {
        this.list.push({ path: to.path, meta: { title: to.meta.title } });
      }
      console.log(this.list);
    },
    list(val) {
      localStorage.setItem("list", JSON.stringify(val));
    }
  },
  methods: {
    goRouter(path) {
      if ("/" + this.$route.name === path) {
        return;
      } else {
        this.$router.push(path);
      }
    },
    dele(e,index){
     
      if(index===this.list.length-1){
        this.list.slice(0,index)
      }
      this.list=this.list.filter(item=>{
        return item.path!=e.path
      })
    }
  },
  components: {
    draggable
  }
};
</script>

<style scoped lang="scss">
.indexBar-box {
  font-size: 15px;
}
.item-box1 {
  border: 1px solid #e6e6e6;
  background-color: #589ef8;
  color: white;
  padding-top: 3px;
  padding-bottom: 3px;
  margin-right: 10px;
  .yuan {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: white;
    margin-left: 6px;
    margin-top: 6px;
  }
  i {
    margin-right: 5px;
    margin-top: 3px;
    cursor: pointer;
  }
}
.item-box2 {
  border: 1px solid #e6e6e6;
  margin-right: 10px;
}
.txt {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 1px;
}
.index-box{
  white-space:nowrap;
}
</style>