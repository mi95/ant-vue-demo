import { login, logout, userPageList, addUser, updUserState, updPwd, resetPwd } from '@/api/user'
/* eslint-disable */
const user = {
  state: {
    id: '',
    account: '',
    lastLoginTime: '',
    loginFailNum: '',
    buttons: [],
    menus: [],
    auths: []
  },

  mutations: {
    SET_USER: (state, userInfo) => {
      state.id = userInfo.user.id
      state.account = userInfo.user.account
      state.menus = userInfo.user.menus
      state.lastLoginTime = userInfo.user.lastLoginTime
      state.loginFailNum = userInfo.user.loginFailNum
      state.menus = userInfo.menus
      state.auths = userInfo.menus
      // state.pages = userInfo.pages
      state.buttons = userInfo.buttons
    },
    SET_LOAD_MENU: (state) => {
      state.auths = []
    }
  },

  actions: {
    // 登录
    Login({ commit }, params) {
      return new Promise((resolve, reject) => {
        login(params).then(response => {
          if (response) {
            commit('SET_USER', response)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LoadMenu({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENU')
      })
    },

    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    UserPageList({ commit }, params) {
      return new Promise((resolve, reject) => {
        userPageList(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    addUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        addUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    updPwd({ commit }, params) {
      return new Promise((resolve, reject) => {
        updPwd(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    resetPwd({ commit }, params) {
      return new Promise((resolve, reject) => {
        resetPwd(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    updUserState({ commit }, params) {
      return new Promise((resolve, reject) => {
        updUserState(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
