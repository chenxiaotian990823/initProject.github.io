/**
 * 平常用到的方法封装于此，比如转换时间什么的都可以写到这里
 */



/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
const debounce = (fn,delay,immediate) => {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, delay)
            if (callNow) fn.apply(context, args)
        }
        else {
            timeout = setTimeout(()=>{
                fn.apply(context, args)
            }, delay);
        }
    }
}
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
const throttle = (func, wait ,type) => {
    let previous = 0;
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        if(type===1){
            let now = Date.now();
            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }
    }
}
/**
 * 简化版本防抖
 */
const debunce = (fn,delay) => {
    let timer = null
    if(timer){
        clearTimeout(timer)
    }
    timer = setTimeout(fn,delay)
}

/**
 * 记忆函数
 */
const memorize = (func, content) =>{
    let cache = {}
    content = content || this
    return function(...key){
        if(!cache[key]){
            cache[key] = func.apply(content,key)
        }
        return cache[key]
    }
}
const add = function(){
    var _args = Array.prototype.slice.call(arguments)
    let a = 0
    for(let item of _args){
        a += item
    }
    return a
}
const calc = memorize(add)


export default {
    debounce,
    throttle,
    debunce,
    calc
}