import { axios } from '@/utils/request'


export function login(parameter) {
  return axios({
    url: '/user/login',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout() {
  return axios({
    url: '/user/logout',
    method: 'get'
  })
}

export function userPageList(parameter) {
  return axios({
    url: '/user/userPageList',
    method: 'get',
    params: parameter
  })
}

export function addUser(parameter) {
  return axios({
    url: '/user/addUser',
    method: 'get',
    params: parameter
  })
}

export function editUser(parameter) {
  return axios({
    url: '/user/editUser',
    method: 'get',
    params: parameter
  })
}

export function updUserState(parameter) {
  return axios({
    url: '/user/updUserState',
    method: 'get',
    params: parameter
  })
}

export function updPwd(parameter) {
  return axios({
    url: '/user/updPwd',
    method: 'get',
    params: parameter
  })
}

export function resetPwd(parameter) {
  return axios({
    url: '/user/resetPwd',
    method: 'get',
    params: parameter
  })
}
