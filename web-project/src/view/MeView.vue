<template>
    <div class="me-view">
        <div class="fb-cell" v-show="userStatus">
            <img src="https://dn-6a1jrcth.qbox.me/ce8307285b7544a07347.png" alt="" class="fb-cell-icon">
            <p class="fb-cell-text">设置</p>
        </div>
        <div class="fb-cell" v-show="userStatus">
            <img src="https://dn-6a1jrcth.qbox.me/8d98518a709716f790b1.png" alt="" class="fb-cell-icon">
            <p class="fb-cell-text">我的资料</p>
        </div>
        <div class="fb-cell">
            <img src="https://dn-6a1jrcth.qbox.me/5ffe77569c4abfd68654.png" alt="" class="fb-cell-icon">
            <p class="fb-cell-text">关于</p>
        </div>
        <div class="fb-cell" @click="userLogout()" v-show="userStatus">
            <img src="https://dn-6a1jrcth.qbox.me/290bd840f3728ffeea81.png" alt="" class="fb-cell-icon">
            <p class="fb-cell-text">退出登录</p>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        methods: {
            ...mapActions([
                'userLogout' // 映射 this.increment() 为 this.$store.dispatch('increment')
            ])
        },
        mounted () {
        },
        computed: {
            ...mapGetters({ userStatus: 'getUserStatus' })
        }
    }
</script>

<style lang="scss">
.me-view {
    padding: 5px 0 10px;
    overflow-y: scroll;
}
.fb-cell {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    padding: 15px;
    margin: 5px 5px 0 5px;

    &.error {
        border: 1px solid #ff5200;
    }

    .fb-cell-icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }
    .fb-cell-input {
        background-color: transparent;
        width: 100%;
        border: 0;
        font-size: 16px;
        margin: 4px 6px;
        &::-webkit-input-placeholder, &::input-placeholder, &:-webkit-input-placeholder, &:-input-placeholder {
            color: #fff;
        }
    }
    .fb-cell-input::-webkit-input-placeholder {
        color: #fff;
    }
    .fb-cell-tab {
        color: #fff;
    }
}
</style>
