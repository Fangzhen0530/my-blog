import axios from 'axios'
import showMessage from '../utils/showMessage'
const ins = axios.create()//创建一个实例对象,可以直接用这个事例发请求，这个事例跟案axios完全一样
// ins事例中有个拦截方法，发送请求时，先运行拦截器，把处理后的结果给请求函数
//发送请求时用ins事例，每一次请求都会先运行拦截器
ins.interceptors.response.use(function(resp){//这是一个拦截器方法，拦截相应,resp是请求回来的数据体
    if(resp.data.code !== 0){//对code进行判断,如果发生错误就调用弹出警告
        showMessage({
            content:resp.data.msg,
            type:"error",
            duration : 1500,
        })
        return null//无数据
    }
    return resp.data.data//如果没有错误，就返回要用的data数据
})
export default ins//把要用的数据导出