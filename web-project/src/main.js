// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './vuex/store'
import router from './router'

Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

// 根据相应环境选择对应的入口
function getEntry () {
    if (isDeveloment()) {
        window.postUrl = 'http://localhost:3000/'
    } else {
        window.postUrl = '/'
    }
}
// 判断生产环境/开发环境
function isDeveloment () {
    if (process.env.NODE_ENV === 'development') {
        return true
    } else {
        return false
    }
}

getEntry()
