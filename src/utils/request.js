import axios from 'axios'
// import config from '../config/index' // 路径配置

// 创建axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
    timeout: 10000 // 请求超时时间,毫秒
})

// request 拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        //  这里处理一些请求出错的情况

        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        // 这里处理一些response 正常放回时的逻辑

        return res
    },
    error => {
        // 这里处理一些response 出错时的逻辑

        return Promise.reject(error)
    }
)

export{
    service as axios
}