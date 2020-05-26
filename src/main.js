import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global'
import './filters'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './bus'
import service from './http/index'
import api from './http/api'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import ZkTable from 'vue-table-with-tree-grid'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ZkTable)

Vue.use(mavonEditor)
Vue.component('chart', ECharts)
Vue.use(ElementUI)
Vue.prototype.$dayjs = dayjs
Vue.prototype.$api = api
Vue.prototype.$axios = service;
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')