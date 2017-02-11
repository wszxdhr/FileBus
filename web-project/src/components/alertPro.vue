<template>
    <transition name="fade">
        <div class="alert-pro" v-show="value">
            <div class="alert-main">
                <p class="alert-title">{{title}}</p>
                <p class="alert-desc">{{desc}}</p>
                <p class="alert-btn" @click="currentValue = false">确定</p>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            title: {
                default: ''
            },
            desc: {
                default: ''
            },
            value: {
                default: false,
                type: Boolean
            }
        },
        data () {
            return {
                currentValue: false
            }
        },
        methods: {
        },
        mounted () {
        },
        watch: {
            value: function (val) {
                this.currentValue = val
            },
            currentValue: function (val) {
                this.$emit('input', val)
            }
        }
    }
</script>

<style lang="scss">
.alert-pro {
    position: fixed;
    top: 0;left: 0;right: 0;bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);

    .alert-main {
        width: 80%;
        background-color: rgba(255, 255, 255, 0.94);
        color: #1e5e73;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -40%;
        margin-top: -20%;
        border-radius: 8px;

        .alert-title {

        }
        .alert-desc {
            padding: 20px;
        }
        .alert-btn {
            height: 50px;
            line-height: 50px;

        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
