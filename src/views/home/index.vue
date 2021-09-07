<template>
    <div class="index">
        <el-input v-model="selectValue" @input="input" />
        <el-input v-model.number="width" />
        <el-input v-model.number="height" />
        <el-button>综合</el-button>
        {{total}}
        <div class="index_over">
            jdkhfjkashdfjkhadsjkfhakjsdhfjkashdjklfhaskjh陈啸天陈啸天陈啸天陈啸天陈啸天陈啸天
        </div>
        <div class="index_testCss">

        </div>
        <div class="test_box">
            <input v-model="selectValue"/>
        </div>
        <div class="test_align">
            <div class="span1" :title='title'>一二三四</div>
            <div class="span2">一二</div>
        </div>
    </div>
</template>

<script>
import common from '@/api/common.js'
import { test } from '@/api/interactive.js'
export default {
    data(){
        return {
            title: '鼠标放上显示',
            selectValue:'',
            width:0,
            height:0,
            total:0
        }
    },
    watch:{
        selectValue(){
            this.valueInput()
        }
    },
    created(){
        // let result = this.add(4)
        // console.log(result(5))
        // this.testPromiseAll()        //测试promise.all
        // this.testInteractive()           //测试调用接口
        this.getTime()
    },
    methods:{
        getTime(){
            let date = new Date()
            console.log(date)
            // console.log(date.toLocaleTimeString())
            // console.log(date.getTime())
        },
        utcToBj(date) {
            let json_date = new Date(date).toJSON();
            return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
        },
        GMTToStr(time) {
            let date = new Date(time)
            let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
            let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
            let hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
            let minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
            let seconds = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`
            let Str = date.getFullYear() + '-' +
                month + '-' +
                day + ' ' +
                hour + ':' +
                minutes + ':' +
                seconds
            return Str
        },
        add(a){
            return (b) =>{
                return a + b
            }
        },
        /**
         * 测试promise
         * 
         */
        testPromiseAll(){
            let result = Promise.all([this.testPromise(0),this.testPromise(0)])
            result
            .then(res =>{
                console.log('result',res)
            })
            .catch(err =>{
                console.log('result',err)
            })
        },
        testPromise(e){
            let p = new Promise ((resolve,reject) =>{
                if(e == 0){
                    resolve('成功')
                }else{
                    reject('失败')
                }
            })
            return p
        },
        testPromise1(){

        },
        testPromise2(){

        },
        /**
         * 测试调用接口
         */
        async testInteractive(){
            try {
                const data = await test({})
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },



        /**
         * 触发函数缓存: console.log(common.calc(1,5,4,5)) 
         */


        /**
         * 用于测试调用公共方法，去处理私有变量 触发方法: this.commit().addNum()  this.commit().delNum()
         */
        commit(){
            var args = 0
            function change(val){
                args += val
                console.log(args)
            }
            return {
                addNum:function(){
                    change(2)
                },
                delNum:function(){
                    change(-1)
                }
            }
        },
        /**
         * 用于测试柯里化函数           测试方法: console.log(this.add(1, 2, 3)(4))
         */
        add(){
            var _args = Array.prototype.slice.call(arguments)           //就是把函数参数转换为数组
            console.log(_args)
            var _adder = function(){
                _args.push(...arguments)
                return _adder
            }
            console.log(_args)
            _adder.toString = function () {
                return _args.reduce(function (a, b) {
                    return a + b;
                });
            }
            console.log(_adder)
            return _adder
        },
        /*通用版防抖.可以控制立马或等待触发s*/ 
        valueInput(){
            common.debounce(this.search,1000,true)()         //防抖
            // common.throttle(this.search,2000,2)()           //节流
        },
        /*以下是用的简化版*/
        // valueInput(){
        //     common.debunce(this.search,2000)
        // },
        search(){
            console.log('2222222')
        },
        input(){
            this.dobunce(this.search2,2000)()
        },
        search2(){
            console.log('search2')
        },
        dobunce(fn,delay){
            let timer = null
            return ()=>{
                if(timer){
                    clearTimeout(timer)
                }
                timer = setTimeout(fn,delay)
            }
        },
    }
}
</script>

<style lang="less" scoped>
    .index{
        .index_over{
            border: 1px solid red;
            width: 160px ;
            height:  20px ;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow: ellipsis;            //最后三行用于裁剪文本，用...来替代超出内容
        }
        .index_testCss{                         //css画一个三角形
            width: 0;
            height: 0;
            border-style:solid;
            border-width: 0 50px 50px;
            border-color: transparent transparent #d9534f;
        }
        .test_box{
            width: 10rem;
            border: 1px solid red;
            height: 20px;
        }
        .test_align{
            // border: 1px solid red;
            text-align: left;
            .span1{

            }
            .span2{
                letter-spacing: 2em;
                margin-right: 2em;
            }
        }
    }
</style>