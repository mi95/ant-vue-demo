import { axios } from '@/utils/request'

export function dataPageList (parameter) {
  return axios({
    url: '/admin/dataPageList',
    method: 'get',
    params: parameter
  })
}
