/**
 * Created by Xiaoxiao on 2016/10/30.
 */
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    state: {
    },
    modules: {
        user
    },
    strict: debug
})
