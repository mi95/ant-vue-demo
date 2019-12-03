import { dataPageList } from '@/api/data'
/* eslint-disable */
export default {
  state: {
    id: '',
    playerNum: '',
    rechargeAmountNum: '',
    rechargePeopleNum: '',
    aliveNum: '',
    playerSum: '',
    rechargeAmountSum: '',
    rechargePeopleSum: '',
    retentionRateTwo: '',
    retentionRateThree: '',
    rechargeSexSum: '',
    rechargeTenSum: '',
    rechargeFiftySum: '',
    rechargeOneHundredSum: '',
    rechargeTwoHundredSum: '',
    rechargeThreeHundredSum: '',
    recordDate: ''
  },
  mutations: {
    // SET_DATA_LIST: (state, dataList) => {
    //   state = { ...dataList }
    // }
  },
  actions: {
    DataPageList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        dataPageList(params).then(response => {
          // commit('SET_DATA_LIST', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
