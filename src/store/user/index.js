import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'
import $dayjs from 'dayjs'

export default {
    namespaced: true,
    state: {
        menus: [],
        users: [],
        rolist: [],
        rList: [],
        goodsList: [],
        orderList: [],
        categories: [],
        attributes: [],
        reports: [],
        cate: [],
        kuaidi: []
    },
    mutations: {
        setMenus(state, data) {
            state.menus = data
        },
        setUsers(state, data) {
            state.users = data
        },
        setRoleList(state, data) {
            state.rolist = data
        },
        setrightList(state, data) {
            state.rList = data
        },
        setgoodsList(state, data) {
            state.goodsList = data
        },
        setOrderList(state, data) {
            state.orderList = data
        },
        setCategories(state, data) {
            state.categories = data
        },
        setAttributes(state, data) {
            state.attributes = data
        },
        setReports(state, data) {
            state.reports = data
        },
        setCate(state, data) {
            state.cate = data
        },
        setKuaidi(state, data) {
            state.kuaidi = data
        },

    },
    actions: {
        async login({ commit }, params) {
            let res = await api.login(params)
            console.log(res);
            if (res.meta.status === 200) {
                localStorage.setItem('adminUser', JSON.stringify(res.date))
                localStorage.setItem('adminToken', res.data.token)
                localStorage.setItem('name', res.data.username)
                router.push('/')
                Message.success('登录成功')
            }
        },
        async getMenus({ commit }) {
            let res = await api.getMenus()
            if (res.meta.status === 200) {
                commit('setMenus', res)
                console.log();
            }
        },
        async getUsers({ commit }, params) {
            let res = await api.getUsers(params)
            console.log(res);
            if (res.meta.status === 200) {
                commit('setUsers', res.data)

            }
        },

        //修改状态
        async modeType({ commit }, id, type) {
            let res = await api.modeType(id, type)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(`${res.meta.msg}`)
            }
        },
        async addUser({ commit, dispatch }, params) {
            let res = await api.addUser(params)
            console.log(res);
            if (res.meta.status === 201) {
                Message.success('添加成功')
                dispatch('getUsers', params)
            }
        },
        async deleteUser({ commit, dispatch }, params) {
            let res = await api.deleteUser(params)
            console.log(res);
            if (res.meta.status === 200) {
                dispatch('getUsers', params)
            }
        },
        async editUser({ commit, dispatch }, params) {
            let res = await api.editUser(params)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success('更新成功')
                dispatch('getUsers', params)
            }
        },
        async roleList({ commit }) {
            let res = await api.roleList()
            console.log(res);
            if (res.meta.status === 200) {
                commit('setRoleList', res.data)
                console.log();
            }
        },
        async distributionUser({ commit, dispatch }, params) {
            let res = await api.distributionUser(params)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(`${res.meta.msg}`)
                dispatch('getUsers', params)
            }
        },
        async rightList({ commit }, type) {
            let res = await api.rightList(type)
            console.log(res);
            if (res.meta.status === 200) {
                commit('setrightList', res.data)

            }
        },
        async getGoods({ commit }, params) {
            let res = await api.getGoods(params)
            console.log(res);
            if (res.meta.status === 200) {
                res.data.goods.map(item => {
                    item.add_time = $dayjs(item.add_time).format('YYYY-MM-DD  HH:mm:ss')
                })
                commit('setgoodsList', res.data)

            }
        },
        async getOrders({ commit }, params) {
            let res = await api.getOrders(params)
            if (res.meta.status === 200) {
                res.data.goods.map(item => {
                    item.create_time = $dayjs(item.create_time).format('YYYY-MM-DD  HH:mm:ss')
                })
                commit('setOrderList', res.data)
            }
        },
        async addRole({ commit, dispatch }, params) {
            let res = await api.addRole(params)
            console.log(res);
            if (res.meta.status === 201) {
                Message.success(`${res.meta.msg}`)
                dispatch('roleList')
            }
        },
        async deleteRole({ commit, dispatch }, params) {
            let res = await api.deleteRole(params)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(`${res.meta.msg}`)
                dispatch('roleList')
            }
        },
        async editRole({ commit, dispatch }, params) {
            let res = await api.editRole(params)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(`${res.meta.msg}`)
                dispatch('roleList')
            }
        },
        async addGoods({ commit }, params) {
            let res = await api.addGoods(params)
            console.log(res);
            if (res.meta.status === 201) {
                Message.success(`${res.meta.msg}`)
                router.push('/goods')
            }
        },
        async deleteGoods({ commit, dispatch }, id) {
            let res = await api.deleteGoods(id)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(`${res.meta.msg}`)

            }
        },
        //获取商品分类
        async getCategories({ commit, dispatch }, params) {
            let res = await api.getCategories(params)
            console.log(res);
            if (params.type === 2) {
                commit('setCate', res.data)
            } else {
                if (res.meta.status === 200) {
                    commit('setCategories', res.data)
                }
            }
        },
        //修改商品分类
        async editCategories({ commit, dispatch }, params) {
            let res = await api.editCategories(params)
            console.log(res);
            if (res.meta.status === 200) {
                dispatch('getCategories', params)
                Message.success(res.meta.msg)

            }
        },
        //删除商品分类
        async deleteCategories({ commit, dispatch }, params) {
            let res = await api.deleteCategories(params)
            console.log(res);
            if (res.meta.status === 200) {
                dispatch('getCategories', params)
                Message.success(res.meta.msg)

            }
        },
        //添加商品分类
        async addCategories({ commit, dispatch }, params) {
            let res = await api.addCategories(params)
            console.log(res);
            if (res.meta.status === 201) {
                dispatch('getCategories', params)
                Message.success(res.meta.msg)

            }
        },

        //获取参数
        async getAttributes({ commit, dispatch }, params) {
            let res = await api.getAttributes(params)
            console.log(res);
            if (res.meta.status === 200) {
                commit('setAttributes', res)
            }
        },
        //添加参数
        async addAttributes({ commit, dispatch }, params) {
            let res = await api.addAttributes(params)
            console.log(res);
            if (res.meta.status === 201) {
                dispatch('getAttributes', params)
            }
        },
        //修改参数
        async editAttributes({ commit, dispatch }, params) {
            let res = await api.editAttributes(params)
            console.log(res);
            if (res.meta.status === 200) {
                dispatch('getAttributes', params)
            }
        },
        //删除参数
        async deleAttributes({ commit, dispatch }, params) {
            let res = await api.deleAttributes(params)
            console.log(res);
            if (res.meta.status === 200) {
                dispatch('getAttributes', params)
            }
        },
        //获取物流
        async getKuaidi({ commit }) {
            let res = await api.getKuaidi()
            console.log(res);
            if (res.meta.status === 200) {
                commit('setKuaidi', res.data)

            }
        },
        async getReports({ commit, dispatch }, id) {
            let res = await api.getReports(id)
            console.log(res);
            if (res.meta.status === 200) {
                commit('setReports', res.data)

            }
        },

    },
}