<template>
    <div :class="['app-header', $route.path === '/' ? '' : $route.path.substring(1)]">
        <router-link class="logo-link" tag="div" :to="{ path: '/'}" replace>
            <Logo></Logo>
        </router-link>
        <router-link :to="{ path: '/trans'}" replace tag="button" class="header-tab trans">
            传输
        </router-link>
        <router-link :to="{ path: '/me'}" replace tag="button" class="header-tab me" v-show="userStatus">
            我
        </router-link>
        <router-link :to="{ path: '/login'}" replace tag="button" class="header-tab login" v-show="!userStatus">
            登录
        </router-link>
        <div class="spring"></div>
        <div class="user-info" @click="showMenu">
            <p class="user-name"><span>{{username}}</span></p>
            <img :src="avatar" alt="" class="user-avatar">
        </div>
        <bubble v-model="showBubble" :direction="bubbleDirection" :position="bubblePosition" :offset="bubbleOffset">
            <li slot="main" v-for="(l, index) in bubbleList" @click="bubbleAction[index]">{{l}}</li>
        </bubble>
    </div>
</template>

<script>
    import Bubble from './Bubble'
    import Logo from './Logo'
    // import axios from 'axios'
    import router from '../router/index'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        props: {
            username: {
                default: '未登录',
                type: String
            },
            avatar: {
                default: 'https://dn-6a1jrcth.qbox.me/06d4b710ee3e94087f35.png',
                type: String
            },
            isLogined: {
                default: false,
                type: Boolean
            }
        },
        data () {
            return {
                showBubble: false,
                bubbleList: [],
                bubbleAction: [],
                bubblePosition: {},
                bubbleOffset: {},
                bubbleDirection: ''
            }
        },
        components: {
            Logo, Bubble
        },
        computed: {
            ...mapGetters({ userStatus: 'getUserStatus' })
        },
        methods: {
            ...mapActions([
                'changeUser', 'changeUserStatus', 'userLogout' // 映射 this.increment() 为 this.$store.dispatch('increment')
            ]),
            showMenu () {
                console.log('show menu')
                var that = this
                if (this.$route.path === '/trans' && this.userStatus) {
                    this.bubbleList = ['设置', '退出登录']
                    this.bubbleAction = [function () {}, function () { that.logout() }]
                    this.bubblePosition = { right: 60, top: 40 }
                    this.bubbleOffset = { x: 0, y: 0 }
                    this.bubbleDirection = 'down'
                    this.showBubble = true
                }
                if (!this.userStatus) {
                    router.replace({ path: '/login' })
                }
            },
            logout () {
                this.userLogout()
                this.showBubble = false
            }
        }
    }
</script>

<style scoped lang="scss">
.app-header {
    background-color: rgba(255, 255, 255, 0.2);
    position: relative;
    height: 70px;
    font-size: 22px;
    color: #ffffff;
    -webkit-transition: all .5s;
    transition: all .5s;
    &.me {
        height: 220px;
        
        .user-name {
            -webkit-transform: translateX(50%);
            transform: translateX(50%);
            right: 50%;
            top: 180px;
        }
        .user-avatar {
            top: 68px;
            right: 50%;
            margin-right: -50px;
            width: 100px;
            height: 100px;
        }
    }
    &.login {
        height: 150px;
        .logo-link {
            left: 50%;
            top: 80px;
            font-size: 68px;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            -webkit-transition: all .5s .35s ease;
            transition: all .5s .35s ease;
            font-weight: 900;
        }
        .header-tab {
            /*opacity: 0;
            pointer-events: none;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);*/
        }
    }
}
.logo-link {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    position: absolute;
    -webkit-transition: all .35s ease;
    transition: all .35s ease;
    left: 15px;
    top: 20px;
    height: 26px;
}
.header-tab {
    font-size: inherit;
    margin-right: 10px;
    color: inherit;
    font-weight: 700;
    -webkit-transition: all .5s;
    transition: all .5s;

    &.trans {
        position: absolute;
        top: 20px;
        left: 100px;
    }
    &.me {
        position: absolute;
        top: 20px;
        left: 160px;
    }
    &.login {
        position: absolute;
        top: 20px;
        left: 160px;
    }
}
.user-info {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-transition: all .5s;
    transition: all .5s;
    .user-name {
        font-size: 16px;
        position: absolute;
        top: 20px;
        right: 46px;
        -webkit-transition: all .5s;
        transition: all .5s;
        height: 26px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .user-avatar {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        position: absolute;
        top: 20px;
        right: 15px;
        -webkit-transition: all .5s;
        transition: all .5s;
        margin: 0;
    }
}
</style>
