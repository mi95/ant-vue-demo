// 一些全局的config配置
const modeUrlObj = {
    // 生产环境
    'production': {
        baseURL: 'prod',
        authBaseURL: ''
    },
    // 开发环境
    'development': {
        baseURL: '/api',
        authBaseURL: ''
    },
    // 测试环境
    'test': {
        baseURL: 'test',
        authBaseURL: ''
    }
}
export default modeUrlObj[process.env.NODE_ENV]
