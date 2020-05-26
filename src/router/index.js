import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home/Home'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        redirect: '/'
    },
    {
        path: '/',
        component: Home,
        children: [{
                path: '',
                name: 'home',
                meta: { title: "首页" },
                component: () =>
                    import ('../pages/index/index')
            },
            {
                path: '/users',
                name: 'users',
                meta: { title: "用户列表" },
                component: () =>
                    import ('../pages/users/users')
            },
            {
                path: '/roles',
                name: 'roles',
                meta: { title: "角色列表" },
                component: () =>
                    import ('../pages/roles/roles')
            },
            {
                path: '/rights',
                name: 'rights',
                meta: { title: "权限列表" },
                component: () =>
                    import ('../pages/rights/rights')
            },
            {
                path: '/goods',
                name: 'goods',
                meta: { title: "商品列表" },
                component: () =>
                    import ('../pages/goods/goods')
            },
            {
                path: '/params',
                name: 'params',
                meta: { title: "分类参数" },
                component: () =>
                    import ('../pages/params/params')
            },
            {
                path: '/categories',
                name: 'categories',
                meta: { title: "商品分类" },
                component: () =>
                    import ('../pages/categories/categories')
            },
            {
                path: '/orders',
                name: 'orders',
                meta: { title: "订单列表" },
                component: () =>
                    import ('../pages/orders/orders')
            },
            {
                path: '/reports',
                name: 'reports',
                meta: { title: "数据报表" },
                component: () =>
                    import ('../pages/reports/reports')
            },
            {
                path: '/addGoods',
                name: 'addGoods',
                meta: { title: "添加商品" },
                component: () =>
                    import ('../pages/addgoods/addgoods')
            },

        ]
    },

    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../pages/login/Login')
    }
]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

export default router