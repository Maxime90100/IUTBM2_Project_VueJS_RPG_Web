import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        isEvent: false,
        eventMessage: '',
        eventCancellable:false
    },
    mutations: {
        pushEvent(state, event){
            state.eventMessage = event.message
            state.eventCancellable = event.cancellable ? event.cancellable : false
            state.isEvent = true
        },
        popEvent(state) {
            state.isEvent = false
        },
    },
}
