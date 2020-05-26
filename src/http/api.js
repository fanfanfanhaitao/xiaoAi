import service from './index'

export default {
    login(params) {
        return service.post('login', params)
    },
    // 根据id查询用户
    getUser(id) {
        return service.get(`users/${id}`)
    },
    // 获取菜单
    getMenus() {
        return service.get('menus')
    },
    //获取用户列表
    getUsers(params) {
        return service.get(params.query ? `users?pagenum=${params.pagenum}&pagesize=${params.pagesize}&query=${params.query}` : `users?pagenum=${params.pagenum}&pagesize=${params.pagesize}`)
    },
    //添加用户
    addUser(params) {
        return service.post('users', params)
    },
    //删除用户
    deleteUser(params) {
        return service.delete(`users/${params.id}`)
    },
    //修改用户状态
    modeType(id, type) {
        return service.put(`users/${id}/state/${type}`)
    },
    //编辑用户
    editUser(params) {
        return service.put(`users/${params.id}`, params)
    },
    //角色列表
    roleList() {
        return service.get('roles')
    },
    //分配角色
    distributionUser(params) {
        return service.put(`users/${params.id}/role`, params)
    },
    //添加角色
    addRole(params) {
        return service.post('roles', params)
    },
    //删除角色
    deleteRole(id) {
        return service.delete(`roles/${id}`)
    },
    //编辑角色
    editRole(params) {
        return service.put(`roles/${params.id}`, params)
    },
    //权限列表
    rightList(type) {
        return service.get(`rights/${type}`)
    },
    //商品列表
    getGoods(params) {
        return service.get(params.query ? `goods?pagenum=${params.pagenum}&pagesize=${params.pagesize}&query=${params.query}` : `goods?pagenum=${params.pagenum}&pagesize=${params.pagesize}`)
    },
    //添加商品
    addGoods(params) {
        return service.post('goods', params)
    },
    //删除商品
    deleteGoods(id) {
        return service.delete(`goods/${id}`)
    },
    //订单列表
    getOrders(params) {
        return service.get(params.query ? `orders?pagenum=${params.pagenum}&pagesize=${params.pagesize}&query=${params.query}` : `orders?pagenum=${params.pagenum}&pagesize=${params.pagesize}`)
    },
    //获取商品分类
    getCategories(params) {
        return service.get(`categories?type=${params.type}&pagenum=${params.pagenum}&pagesize=${params.pagesize}`)
    },
    //修改分类
    editCategories(params) {
        return service.put(`categories/${params.id}`, params)
    },
    //删除分类
    deleteCategories(params) {
        return service.delete(`categories/${params.id}`, params)
    },
    //添加分类
    addCategories(params) {
        return service.post('categories', params)
    },
    //参数列表
    getAttributes(params) {
        return service.get(`categories/${params.id}/attributes?sel=${params.sel}`)
    },
    //添加参数
    addAttributes(params) {
        return service.post(`categories/${params.id}/attributes`, params)
    },

    //修改参数
    editAttributes(params) {
        return service.put(`categories/${params.id}/attributes/${params.attrId}`, params)
    },
    //删除参数
    deleAttributes(params) {
        return service.delete(`categories/${params.id}/attributes/${params.attrId}`)
    },
    //查看物流
    getKuaidi() {
        return service.get(`/kuaidi/804909574412544600`)
    },
    //折线图数据
    getReports() {
        return service.get('reports/type/1')
    }

}