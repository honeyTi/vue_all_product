import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import * as getters from './getter.js'
import mutations from './mutation.js'
import actions from './actions.js'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// eslint-disable-next-line no-undef
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: debug ? [createLogger()] : []
})
