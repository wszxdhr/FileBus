import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import MeView from '../view/MeView'
import LoginView from '../view/LoginView'
import TransView from '../view/TransView'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/me',
            name: 'MeView',
            component: MeView
        },
        {
            path: '/login',
            name: 'LoginView',
            component: LoginView
        },
        {
            path: '/trans',
            name: 'TransView',
            component: TransView
        }
    ]
})
