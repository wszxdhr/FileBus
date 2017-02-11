<template>
  <div id="app">
    <app-header :username="$store.getters.getUser.username" :avatar="$store.getters.getUser.avatar"></app-header>
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
    import AppHeader from './components/AppHeader'
    import axios from 'axios'
    import { mapActions } from 'vuex'
    // import store from './vuex/store.js'
    export default {
        name: 'app',
        data () {
            return {
            }
        },
        components: {
            AppHeader
        },
        methods: {
            ...mapActions([
                'changeUser', 'changeUserStatus' // 映射 this.increment() 为 this.$store.dispatch('increment')
            ])
        },
        vuex: {
            getters: {
                // getText
            }
        },
        mounted () {
            axios.post('http://localhost:3000/currentUser', {}).then((result) => {
                if (result.data.success === 1) {
                    this.changeUser(result.data.user)
                    this.changeUserStatus(true)
                }
            })
        }
    }
</script>

<style lang="scss">
* {
  margin: 0; 
  padding: 0;
  box-sizing: border-box;
}
html {
/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#24aac1+0,4abae2+100 */
background: #24aac1; /* Old browsers */
background: -moz-linear-gradient(-45deg,  #24aac1 0%, #4abae2 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(-45deg,  #24aac1 0%,#4abae2 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(135deg,  #24aac1 0%,#4abae2 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#24aac1', endColorstr='#4abae2',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

}
body, html {
  width: 100%;
  height: 100%;
}
#app {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;

    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    box-orient: vertical;
    flex-direction: column;
}
.router-view {
    /*background-color: rgba(255, 255, 255, 0.8);*/
    -webkit-transition: background-color .4s;
    transition: background-color .4s;
    -webkit-box-flex: 1;
    -webkit-box: 1;
    -webkit-flex: 1;
    flex: 1;
}
.spring {
    -webkit-box-flex: 1;
    -webkit-box: 1;
    -webkit-flex: 1;
    flex: 1;
}
button, input, textarea {
    background-color: transparent;
    border: 0;
    display: block;
    resize: none;
    &:active, &:focus, &:hover {
        outline: none; 
    }
}
</style>
