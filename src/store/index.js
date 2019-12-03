import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import data from './modules/data'
import auths from './modules/auths'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    data,
    auths,
    setting
  }
})
