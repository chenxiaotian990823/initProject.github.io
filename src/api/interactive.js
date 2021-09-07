/**
 * 交互的api
 */
import instance from "../util/request"

export const test = (data) =>{
    return instance({
        method: 'POST',
        url: '/login',
        data: data
    })
}
