import axios from 'axios'

//创建一个实例
let instance = axios.create({
    baseURL:'/test',
    // baseURL:'/dev',
})

//请求拦截器
instance.interceptors.request.use(
    config =>{
        /**
         * 此处可以处理一些，填一个token啥的
         */
        return config
    },
    err =>{
        return Promise.reject(err)
    }
)

//响应拦截器
instance.interceptors.response.use(
    res =>{
        /**
         * 此处可以用来处理一些，什么token过期什么的
         */
        return res
    },
    err =>{
        return Promise.reject(err)
    }
)

//暴露出去
export default instance