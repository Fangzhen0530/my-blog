// 该文件是一个发送网络请求的方法
// import axios from 'axios'
// import showMessage from '../utils/showMessage'
// const ins = axios.create()//创建一个实例对象,可以直接用这个事例发请求，跟axios一样
// ins.interceptors.response.use(function(resp){//这是一个拦截器方法，对回应体拦截,resp是请求回来的数据体
//     if(resp.data.code !== 0){//对code进行判断,如果发生错误就调用弹出警告
//         showMessage({
//             content:resp.data.msg,
//             type:"error",
//             duration : 1500,
//         })
//         return null//无数据
//     }
//     return resp.data.data
// })
//axios每次请求数据都会先运行拦截提，然后把数据给请求函数
//把拦截器专门放到一个文件里

import request from './request'
export async function getData(){//该方法只负责获取正常的数据（code=0），不正常的拦截器处理
    const resp = await request.get("/api/banner")
    //请求回来的数据有可能会报错（code不等于0），希望有错误提示。
    // 如果把对code的判断写到这个函数里，有冗余
    return resp
}
// getData()