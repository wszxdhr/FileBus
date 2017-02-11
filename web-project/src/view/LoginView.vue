<template>
    <div class="login-view">
        <div class="fb-cell tab-cell">
            <button :class="['fb-cell-tab', type === '注册'? 'active' : '']" @click="type = '注册'">注册</button>
            <button :class="['fb-cell-tab', type === '登录'? 'active' : '']" @click="type = '登录'">登录</button>
        </div>
        <div class="fb-cell">
            <input type="text" class="fb-cell-input" placeholder="请输入手机号/邮箱" v-model="username" maxlength="30">
        </div>
        <div class="fb-cell">
            <input @input="onInput" @change="onChange" type="password" v-show="type === '登录' || seePassword === false" :class="['fb-cell-input', {'error': passwordError}]" placeholder="请输入密码" v-model="password" maxlength="14">
            <input @input="onInput" @change="onChange" type="text" v-show="!(type === '登录' || seePassword === false)" :class="['fb-cell-input', {'error': passwordError}]" placeholder="请输入密码" v-model="password" maxlength="14">
        </div>
        <div class="fb-cell" v-show="type === '注册'">
            <button class="get-vertify">获取验证码</button>
            <input type="text" class="fb-cell-input" placeholder="请输入验证码" maxlength="6" v-model="vertify">
        </div>
        <button :class="['login-btn', type === '注册' ? 'sign-btn' : '', {'register-success': btnSuccess && type === '注册', 'login-success': btnSuccess && type === '登录'}]" @click="type === '登录' ? login() : sign()">
            <span :class="['btn-loading-icon', 'rotate', {'show': btnLoading}]" :style="{'margin-left': btnSuccess ? '-55px' : '-45px'}"></span>
            <span :class="['btn-success-icon', {'show': btnSuccess}]" :style="{'margin-left': btnSuccess ? '-50px' : '-40px'}"></span>
            {{type}}{{(type === '注册' && btnSuccess === true) ? '成功' : ''}}
        </button>
        <alert v-model="showAlert" :desc="msg"></alert>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapActions } from 'vuex'
    import alert from '../components/alertPro'
    import router from '../router/index'
    export default {
        data () {
            return {
                type: '注册',
                seePassword: true,
                username: '',
                password: '',
                vertify: '',
                msg: '',
                showAlert: false,
                passwordError: false,
                btnLoading: false,
                btnSuccess: false
            }
        },
        methods: {
            ...mapActions([
                'changeUser', 'changeUserStatus' // 映射 this.increment() 为 this.$store.dispatch('increment')
            ]),
            onInput () {
                if (this.password.length >= 6) {
                    this.passwordError = false
                }
            },
            onChange () {
                if (this.password.length < 6) {
                    this.passwordError = true
                } else {
                    this.passwordError = false
                }
            },
            login () {
                console.log('login')
                this.btnLoading = true
                this.btnSuccess = false
                axios.post(window.postUrl + 'login', {
                    username: this.username,
                    password: this.password
                }).then((result) => {
                    console.log(result.data)
                    if (result.data.success === 1) {
                        this.btnLoading = false
                        this.btnSuccess = true
                        this.changeUser(result.data.loginedUser)
                        this.changeUserStatus(true)
                        setTimeout(() => {
                            router.replace({path: '/me'})
                        }, 1000)
                    } else {
                        switch (result.data.err_code) {
                        case 202: this.msg = '用户名已占用！'; break
                        case 210: this.msg = '密码不正确，再试试~'; break
                        case 211: this.msg = '用户名不正确，再想想~'; break
                        default: this.msg = '未知错误，错误代码：' + result.data.err_code; break
                        }
                        this.showAlert = true
                        this.btnLoading = false
                        this.btnSuccess = false
                    }
                })
            },
            sign () {
                this.btnLoading = true
                this.btnSuccess = false
                console.log('sign : ' + this.username + ' , ' + this.password + ' , ' + this.vertify)
                axios.post(window.postUrl + 'register', {
                    username: this.username,
                    password: this.password,
                    vertify: this.vertify
                }).then((result) => {
                    console.log('then')
                    console.log(result.data)
                    if (result.data.success === 1) {
                        this.btnLoading = false
                        this.btnSuccess = true
                        setTimeout(() => {
                            this.type = '登录'
                            this.btnLoading = false
                            this.btnSuccess = false
                        }, 1000)
                    } else {
                        switch (result.data.err_code) {
                        case 202: this.msg = '用户名已占用！'; break
                        default: this.msg = '未知错误，错误代码：' + result.data.err_code; break
                        }
                        this.showAlert = true
                        this.btnLoading = false
                        this.btnSuccess = false
                    }
                })
            }
        },
        mounted () {
            console.log('me-view mounted')
        },
        components: {
            alert
        }
    }
</script>

<style scoped lang="scss">
.login-view {
    background-color: transparent;
    overflow-y: scroll;
    padding: 5px 0 10px;
    padding: 0 20px;
    color: #fff;

    .fb-cell {
        margin: 20px 0 0;
    }

    input {
        color: #fff;
    }
}
.login-btn {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    color: #fff;
    margin: 20px 0 0;
    padding: 5px 0;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    background: #52d3aa;
    height: 54px;
    border-radius: 50px;
    -webkit-transition: background-color .5s;
    transition: background-color .5s;
}
.sign-btn {
    background-color: #2e8aa7;
}
.fb-cell-tab {
    text-align: center;
    width: 30%;
    font-size: 22px;
    font-weight: 800;

    &:first-child {
        margin-left: 20%;
    }
    &:last-child {
        margin-right: 20%;
    }
    &.active {
        position: relative;

        &:after {
            content: '';
            position: absolute;
            width: 80%;
            margin-left: 10%;
            bottom: -15px;
            left: 0;
            height: 3px;
            background-color: #fff;
        }
    }
}
.tab-cell {
    background-color: rgba(255, 255, 255, 0.34);
}
.get-vertify {
    color: #fff;
    order: 2;
    font-size: 16px;
    &+* {
        -webkit-box-flex: 1;
        -webkit-box: 1;
        -webkit-flex: 1;
        flex: 1;
    }
}
.login-btn {
    position: relative;
    .btn-loading-icon {
        position: absolute;
        top: 17px;
        left: 50%;
        width: 20px;
        height: 20px;
        border-radius: 60px;
        border: 2px solid #fff;
        border-top: 0;
        display: block;
        margin-left: -45px;
        opacity: 0;
        -webkit-transition: opacity .3s;
        transition: opacity .3s;
        &.rotate {
            -webkit-animation: rotate .8s linear infinite;
            animation: rotate .8s linear infinite;
        }

        &.show {
            opacity: 1;
        }
    }
    .btn-success-icon {
        position: absolute;
        top: 16px;
        left: 50%;
        width: 10px;
        height: 18px;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        margin-left: -40px;
        border-bottom: 2px solid #ffffff;
        border-right: 2px solid #ffffff;
        opacity: 0;
        -webkit-transition: opacity .3s;
        transition: opacity .3s;

        &.show {
            opacity: 1;
        }
    }
    &.register-success {
        background-color: #3699b8;
    }
    &.login-success {
        background-color: #68e9c0;
    }
}

@-webkit-keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
