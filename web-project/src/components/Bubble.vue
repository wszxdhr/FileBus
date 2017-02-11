<template>
    <transition name="fade">
        <div class="fb-bubble" v-show="value">
            <div class="mask" @click="currentValue = false"></div>
            <ul :class="['fb-bubble-main', direction]" :style="{top: position.top + 'px', right: position.right + 'px', left: position.left + 'px', bottom: position.bottom + 'px'}">
                <slot class="fb-bubble-item" name="main"></slot>
            </ul>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            position: {
                default: {
                    top: 0,
                    right: 0
                },
                type: Object
            },
            offset: {
                default: {
                    x: 0,
                    y: 0
                },
                type: Object
            },
            direction: {
                default: 'down',
                type: String
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
    .fb-bubble {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .mask {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .fb-bubble-main {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.92);
            color: #000000;
            border-radius: 8px;
            padding: 5px 0;
            min-width: 120px;
            text-align: center;
            
            &>* {
                list-style: none;
                line-height: 40px;
                border-bottom: 1px solid #e7e7e7;
                padding: 0, 10px;
                -ms-user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;
                user-select: none;
                font-size: 16px;
                font-weight: 200;

                &:active {
                    background-color: rgba(0, 0, 0, 0.1);
                }

                &:last-of-type {
                    border-bottom: 0;
                }
            }
            &.up {
                -webkit-transform: translate(50%, -100%);
                transform: translate(50%, -100%);
                margin-bottom: 18px;
                &:after {
                    content: '';
                    display: block;
                    border-color: rgba(255, 255, 255, 0.92) transparent transparent transparent;
                    border-style: solid solid solid solid;
                    border-width: 10px;

                    /* 設定 width、height 可更好理解原理 */
                    height: 0px;
                    width: 0px;
                    margin-bottom: -25px;
                    margin-left: 50%;
                    -webkit-transform: translateX(-50%);
                    transform: translate(-50%, 0);
                }
            }
            &.down {
                -webkit-transform: translate(50%, 0);
                transform: translate(50%, 0);
                margin-top: 18px;

                &:before {
                    content: '';
                    display: block;
                    border-color: transparent transparent rgba(255, 255, 255, 0.92) transparent;
                    border-style: solid solid solid solid;
                    border-width: 10px;

                    /* 設定 width、height 可更好理解原理 */
                    height: 0px;
                    width: 0px;
                    margin-top: -25px;
                    margin-left: 50%;
                    -webkit-transform: translateX(-50%);
                    transform: translate(-50%, 0);
                }
            }
            &.left {
                -webkit-transform: translate(-100%, -50%);
                transform: translate(-100%, -50%);
                margin-right: 18px;
            }
            &.right {
                -webkit-transform: translate(100%, -50%);
                transform: translate(100%, -50%);
                margin-left: 18px;
            }
        }
    }
</style>
