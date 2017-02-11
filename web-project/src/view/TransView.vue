<template>
    <div class="trans-view">
        <div class="trans-content" @scroll="onscroll" ref="scrollContent">
            <template v-for="d in transData">
                <div :class="['trans-title', d.device === currentDevice ? 'right' : 'left']">{{d.updatedAt}}({{d.device}})</div>
                <div :class="['trans-msg', d.device === currentDevice ? 'right' : 'left']">{{d.content}}</div>
            </template>
        </div>
        <div class="input-bar">
            <div class="input-box">
                <div class="up-btn" @touchstart="ontouchstart" @touchmove="ontouchmove" @touchend="ontouchend"><p>A</p></div>
                <textarea name="" v-model="transText" rows="1" class="inner-input" :style="{'min-height': textareaHeight + 'px'}"></textarea>
                <button class="send-btn" @click="onSend">发送</button>
            </div>
            <div class="file-box">
                <div class="file-btn">A</div>
                <div class="file-btn">B</div>
                <div class="file-btn">C</div>
                <div class="file-btn">D</div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                textareaHeight: 36,
                touchObj: {
                    startY: 0,
                    isTouching: false,
                    startH: 0
                },
                transText: '',
                transData: {},
                currentDevice: 'Phone'
            }
        },
        methods: {
            ontouchstart (event) {
                // console.log('touchstart')
                this.touchObj.isTouching = true
                this.touchObj.startY = event.touches[0].pageY
                this.touchObj.startH = this.textareaHeight
            },
            ontouchmove (event) {
                // console.log('touchmove')
                console.log(event.touches[0].pageY)
                this.textareaHeight = this.touchObj.startH - (event.touches[0].pageY - this.touchObj.startY)
            },
            ontouchend (event) {
                console.log('touchend')
                this.touchObj.isTouching = false
            },
            onscroll (event) {
                // console.log('onscroll , top : ')
                // console.log(event.srcElement.scrollTop)
            },
            scrollToBottom () {
                this.$refs.scrollContent.scrollTop = 100000000000
            },
            onSend () {
                console.log(this.transText)
                axios.post(window.postUrl + 'sendFile', {
                    content: this.transText,
                    type: 'string'
                }).then((result) => {
                    console.log(result.data)
                })
            }
        },
        mounted () {
            // console.log(this.$refs.scrollContent)
            axios.post(window.postUrl + 'getFile', {
                start: 0,
                length: 10
            }).then((result) => {
                console.log(result.data)
                this.transData = result.data.files
            })
            this.scrollToBottom()
        }
    }
</script>

<style scoped lang="scss">
.trans-view {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    box-orient: vertical;
    flex-direction: column;
}
.trans-content {
    overflow-y: scroll;
    -webkit-box-flex: 1;
    -webkit-box: 1;
    -webkit-flex: 1;
    flex: 1;

    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;

    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    box-orient: vertical;
    flex-direction: column;

    .trans-msg {
        background-color: rgba(255, 255, 255, 0.24);
        border-radius: 5px;
        width: 80%;
        margin: 8px;
        padding: 8px;
        word-break: break-all;
        color: #fff;
        -webkit-align-self: center;
        align-self: center;

        &.left {
            -webkit-align-self: flex-start;
            align-self: flex-start;
        }
        &.right {
            -webkit-align-self: flex-end;
            align-self: flex-end;
        }
    }
    .trans-title {
        color: #2e8aa7;
        font-size: 14px;
        margin: 12px 8px 0;

        &.left {
            -webkit-align-self: flex-start;
            align-self: flex-start;
            text-align: left;
        }
        &.right {
            -webkit-align-self: flex-end;
            align-self: flex-end;
            text-align: right;
        }
    }
}
.trans-content>div:first-of-type {
    margin-top: 20px;
}
.trans-content>div:last-of-type {
    margin-bottom: 20px;
}
.input-bar {
    background-color: rgba(255, 255, 255, 0.2);
    padding-top: 15px;
    &>div {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }
    .input-box {
        padding: 0 6px 10px;
        .up-btn {
            width: 26px;
            /*height: 26px;*/
            margin: 0 5px 0 0;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            /*-webkit-box-orient: vertical;
            -moz-box-orient: vertical;
            box-orient: vertical;
            flex-direction: column;*/
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.24);
            color: #fff;
            &>p {
                text-align: center;
                width: 100%;
            }
        }
        .inner-input {
            -webkit-box-flex: 1;
            -webkit-box: 1;
            -webkit-flex: 1;
            flex: 1;
            height: 36px;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.24);
            line-height: 26px;
            font-size: 18px;
            padding: 6px 12px;
            color: #fff;
        }
        .send-btn {
            width: 60px;
            font-size: 18px;
            color: #fff;
            background-color: rgba(255, 255, 255, 0.24);
            border-radius: 5px;
            margin-left: 5px;
        }
    }
    .file-box {
        height: 36px;
        margin-top: 4px;
        .file-btn {
            -webkit-box-flex: 1;
            -webkit-box: 1;
            -webkit-flex: 1;
            flex: 1;
            text-align: center;
        }
    }
}
</style>
