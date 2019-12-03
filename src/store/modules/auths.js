import { findAuthList, addRole, editRole, updRoleState, findRolePageList, findRoleById, addRoleUser, delRoleUser, findUserPageListByRoleId, findUserPageListByRoleIdForNotExist, addRoleAuth, delRoleAuth, findAuthListByRoleId } from '@/api/auths'
/* eslint-disable */
export default {
  state: {
    authList: [
      {
        id: '',
        name: '',
        fatherId: '',
        path: '',
        icon: '',
        type: '',
        buttonId: '',
        state: ''
      }
    ]
  },
  mutations: {
    // SET_ROUTER: (state, data) => {
    //   state.routerMap = { ...data }
    // }
  },
  actions: {
    findAuthList({ commit }, params) {
      return new Promise((resolve, reject) => {
        findAuthList(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addRole({ commit }, params) {
      return new Promise((resolve, reject) => {
        addRole(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    editRole({ commit }, params) {
      return new Promise((resolve, reject) => {
        editRole(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updRoleState({ commit }, params) {
      return new Promise((resolve, reject) => {
        updRoleState(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    findRolePageList({ commit }, params) {
      return new Promise((resolve, reject) => {
        findRolePageList(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    findRoleById({ commit }, params) {
      return new Promise((resolve, reject) => {
        findRoleById(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addRoleUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        addRoleUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    delRoleUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        delRoleUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    findUserPageListByRoleId({ commit }, params) {
      return new Promise((resolve, reject) => {
        findUserPageListByRoleId(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    findUserPageListByRoleIdForNotExist({ commit }, params) {
      return new Promise((resolve, reject) => {
        findUserPageListByRoleIdForNotExist(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addRoleAuth({ commit }, params) {
      return new Promise((resolve, reject) => {
        addRoleAuth(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    delRoleAuth({ commit }, params) {
      return new Promise((resolve, reject) => {
        delRoleAuth(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    findAuthListByRoleId({ commit }, params) {
      return new Promise((resolve, reject) => {
        findAuthListByRoleId(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
