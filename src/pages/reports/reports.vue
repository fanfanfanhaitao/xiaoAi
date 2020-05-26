<template>
 <div><div class="all">
      <el-card class="box">
        <div class="box-one">
          <chart :options="options" class="ss"></chart>
        </div>
      </el-card>
    </div></div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const UserModule = createNamespacedHelpers("user");
//引用vuex里面的方法和数组
const { mapActions: userActions, mapState: userState } = UserModule;
import chart from 'vue-echarts'
 export default {
   data () {
     return {
       options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        //头部的标题
        legend: {
          data: []
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        //横坐标
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: []
          }
        ],
        yAxis: [
          {
            type: ""
          }
        ],
        //
        series: []
      }
     }
   },
   components: {
    chart
   },
   methods: {
 ...userActions(["getReports"]),
    getReport(){
      this.getReports().then(()=>{
        this.options.legend.data = this.reports.legend.data
        this.options.xAxis[0].data = this.reports.xAxis[0].data
        this.options.series = this.reports.series
        this.options.yAxis[0].type = this.reports.yAxis[0].type

      })
    }

   },
   mounted() {
     this.getReport()
   },
   watch: {

   },
   computed: {
 ...userState(["reports"])
   }
 }
</script>

<style scoped lang='scss'>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.all {
  width: 100%;
}
.box {
  width: 96%;
  height: 600px;
  margin: 20px auto;
}
.box-one {
  width: 70%;
}
.ss{
  width: 90%;
  margin-top: 100px;
}

</style>