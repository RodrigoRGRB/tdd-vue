import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [],
})
