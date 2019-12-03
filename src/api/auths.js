import { axios } from '@/utils/request'

export function findAuthList(params) {
  return axios({
    url: '/auth/findAuthList',
    method: 'get',
    params: params
  })
}

export function addRole(params) {
  return axios({
    url: '/auth/addRole',
    method: 'post',
    params: params
  })
}

export function editRole(params) {
  return axios({
    url: '/auth/editRole',
    method: 'post',
    params: params
  })
}

export function updRoleState(params) {
  return axios({
    url: '/auth/updRoleState',
    method: 'post',
    params: params
  })
}

export function findRolePageList(params) {
  return axios({
    url: '/auth/findRolePageList',
    method: 'get',
    params: params
  })
}

export function findRoleById(params) {
  return axios({
    url: '/auth/findRoleById',
    method: 'get',
    params: params
  })
}

export function addRoleUser(params) {
  return axios({
    url: '/auth/addRoleUser',
    method: 'post',
    params: params
  })
}

export function delRoleUser(params) {
  return axios({
    url: '/auth/delRoleUser',
    method: 'post',
    params: params
  })
}

export function findUserPageListByRoleId(params) {
  return axios({
    url: '/auth/findUserPageListByRoleId',
    method: 'get',
    params: params
  })
}

export function findUserPageListByRoleIdForNotExist(params) {
  return axios({
    url: '/auth/findUserPageListByRoleIdForNotExist',
    method: 'get',
    params: params
  })
}

export function addRoleAuth(params) {
  return axios({
    url: '/auth/addRoleAuth',
    method: 'post',
    params: params
  })
}

export function delRoleAuth(params) {
  return axios({
    url: '/auth/delRoleAuth',
    method: 'post',
    params: params
  })
}

export function findAuthListByRoleId(params) {
  return axios({
    url: '/auth/findAuthListByRoleId',
    method: 'get',
    params: params
  })
}
