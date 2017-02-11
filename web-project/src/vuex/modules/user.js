/**
 * Created by Xiaoxiao on 2016/12/15.
 */
// initial state
// shape: [{ id, quantity }]
import axios from 'axios'
import router from '../../router/index'
const state = {
    userInfo: {},
    isLogined: false
}

// getters
const getters = {
    getUser: state => state.userInfo,
    getUserStatus: state => state.isLogined
}
// actions
const actions = {
    changeUser ({ commit, state }, userObj) {
        commit('setUser', userObj)
    },
    changeUserStatus ({ commit, state }, status) {
        commit('setUserStatus', status)
    },
    userLogout ({ commit, state }, status) {
        console.log('logout')
        axios.post(window.postUrl + 'logout', {}).then(function (result) {
            if (result.data.success === 1) {
                commit('setUser', {})
                commit('setUserStatus', false)
                router.replace({path: '/login'})
            } else {

            }
        })
    }
}

// mutations
const mutations = {
    setUser (state, userObj) {
        state.userInfo = userObj
    },
    setUserStatus (state, status) {
        state.isLogined = status
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
