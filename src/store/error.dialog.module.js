import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        isError: false,
        errorMsg: '',
    },
    mutations: {
        pushError(state, msg){
            state.errorMsg = msg
            state.isError = true
        },
        popError(state) {
            state.isError = false
        },
    },
}
