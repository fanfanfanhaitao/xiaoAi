<template>
  <el-container>
    <el-header>
      <div class="home-head">
        <div class="m-left3">欢迎来到小爱后台系统</div>
        <div class="h-right">
          <div class="time">{{date}}</div>
          <div class="weather">
            <img :src="img" alt class="weather-img" />
            {{wearther}}
          </div>
          <div class="user">亲爱的,{{name}}</div>
          <div class="out" @click="out">退出</div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <div class="home-aside">
          <el-menu :default-active="url" :unique-opened="true" router class="el-menu-vertical-demo">
            <el-menu-item index="home" >
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu :index="String(item.order)" v-for="(item,index) in menus.data" :key="index">
              <template slot="title">
                <i :class="icon[index].class"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="item1.path"
                  v-for="(item1,index1) in item.children"
                  :key="index1"
                  @click="go(item1)"
                >
                  <i :class="icon[index].children[index1].icon"></i>
                  <span>{{item1.authName}}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <div class="main-head">
          <!-- <draggable v-model="data" @update="datadragEnd" :options="{animation:500}">
          <transition-group>
            <el-tag class="tag" v-bind:class="{ active: path===item.path }" v-for="item in data" :color="path===item.path ? '' : '#fff'" :type="path===item.path ? 'success' : ''" :key="item.path" 
            :closable="path===item.path ? true : false" @click="tagItem(item)" @close="closeItem(item,index)">
              <span v-if="path===item.path" class="span">●</span>
              {{item.authName}}
            </el-tag>
          </transition-group>
          </draggable>-->
          <!-- <draggable
            class="flex"
            v-model="list"
            group="people"
            @start="drag=true"
            @end="drag=false"
          >
            <div class="flex,index-box" v-for="(item,index) in data" :key="index">
              <div class="flex,item-box1" v-if="item.path===url" @click="goRouter(item.path)">
                <div class="yuan"></div>
                <div class="txt f12">{{item.meta.title}}</div>
                <i class="el-icon-close"></i>
              </div>
             
            </div>
          </draggable> -->
           <list></list>
        </div>
          
        <el-card class="box-card">
          <router-view></router-view>
          </el-card>
        
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
import draggable from "vuedraggable";
import list from "../../components/home/list";
export default {
  name: "",
  props: {},
  components: {
    draggable,
    list
  },
  data() {
    return {
      date: "",
      timer: "",
      wearther: "",
      img: "",
      name: "",
      icon: [
        {
          class: "el-icon-user",
          children: [{ icon: "el-icon-folder-opened" }]
        },
        {
          class: "el-icon-folder",
          children: [
            { icon: "el-icon-setting" },
            { icon: "el-icon-c-scale-to-original" }
          ]
        },
        {
          class: "el-icon-shopping-bag-1",
          children: [
            { icon: "el-icon-help" },
            { icon: "el-icon-bell" },
            { icon: "el-icon-date" }
          ]
        },
        {
          class: "el-icon-s-order",
          children: [{ icon: "el-icon-folder-add" }]
        },
        { class: "el-icon-message", children: [{ icon: "el-icon-position" }] }
      ],
      
    // list: [{ path: "home", meta: { title: "首页" } }]
    };
  },
  methods: {
    getTime() {
      this.date = new Date().toLocaleString();
    },
    getweather() {
      this.$axios
        .jsonp(
          "http://api.map.baidu.com/telematics/v3/weather?location=%E6%88%90%E9%83%BD&output=json&ak=3p49MVra6urFRGOT9s8UBWr2&callback=__jp0"
        )
        .then(res => {
          this.wearther = res.results[0].weather_data[0].weather;
          let hour = this.$dayjs().hour();
          if (hour > 7 && hour < 18) {
            this.img = res.results[0].weather_data[0].dayPictureUrl;
          } else {
            this.img = res.results[0].weather_data[0].nightPictureUrl;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    out(){
       this.$router.push('login');
    },
    // gohome() {
    //   this.path = "home";
    // },
    //侧边栏跳转
    go(e) {
      // this.path = e.path;
      // this.data.push(e);
      // let arr = this.data;
      // this.data = arr.filter(function(item, index, arr) {
      //   return arr.indexOf(item) === index;
      // });
      //  localStorage.setItem('data',JSON.stringify(this.data))
    },
    // add(){
    //   if(localStorage.getItem("list")){
    //   this.list = localStorage.getItem("list");
    //   this.list=this.list.push({ path: "/home", meta: { title: "首页" } })
    //   localStorage.setItem("list", this.list);
    // }
   
    //拖拽栏跳转
    tagItem(e) {
      // this.path = e.path;
      this.$router.push(`${e.path}`);
    },
    //删除
    closeItem(e, index) {
      console.log(e);
      console.log(object);
      // this.data = this.data.filter(item => {
      //   return item.authName !== e.authName;
      // });
      console.log(this.data);
    },
    getdata(evt) {
      console.log(evt.draggedContext.element.text);
    },
    datadragEnd(evt) {
      evt.preventDefault();
      console.log("拖动前的索引 :" + evt.oldIndex);
      console.log("拖动后的索引 :" + evt.newIndex);
      console.log(this.data);
    },
    ...userActions(["getMenus"])
  },
  mounted() {
    this.timer = setInterval(this.getTime, 1000);
    this.getweather();
    this.name = localStorage.getItem("name");
    this.getMenus();
    // if(localStorage.getItem("list")){
    //   this.list = JSON.parse(localStorage.getItem("list"));
    // }

    //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
  },
  watch: {
    // $route(to) {
    //   // console.log(to);
    //   console.log(to.path);
    //   if (this.list.filter(item => item.path === to.path).length === 0) {
        
    //       this.list.push({ path: to.path, meta: { title: to.meta.title } });
      
        
    //   }
    //   console.log(to.meta.title);
    //   // console.log(this.list);
    // },
    // list(val) {
    //   localStorage.setItem("list", JSON.stringify(val));
    // }
  },
  computed: {
    ...userState(["menus"]),
    url() {
      console.log(this.$route.name);
      return this.$route.name;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang='scss'>
.home-head {
  border-bottom: 1px solid #f0f2f5;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  background-color: white;
  z-index: 999;
}
.h-right {
  display: flex;
  align-items: center;
  margin-right: 30px;
  div {
    margin-right: 20px;
  }
}
.weather {
  display: flex;
  align-items: center;
}
.weather-img {
  width: 40px;
  height: 30px;
  margin-right: 10px;
}
.out {
  color: #409eff;
}
.home-aside {
  height: calc(100vh - 80px) !important;
  z-index: 999;
  border-right: 1px solid #f0f2f5;
}
ul {
  list-style: none;
  padding-bottom: 20px;
}
.el-menu-vertical-demo {
  margin-left: 40px;
}
.m-left3 {
  margin-left: 30px;
}
.tag {
  color: black;
  margin-left: 10px;
}
.active {
  color: white;
}
.main-head {
  border-bottom: 1px solid #f0f2f5;
  padding-bottom: 10px;
}
.box-card {
  margin-top: 20px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
}
</style>