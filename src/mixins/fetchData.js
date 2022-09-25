// 这个文件夹里的文件，都是不同组件抽离出来的类似功能的代码  混入。注重通用性
// 某个组件混入这块功能时，就相当于这个配置插入到了组件中
export default function(defaultDataValue = null){
    return {
        data(){
            return {
                isLoaded:true,//数据请求回来之前是正在加载状态，会有等待效果
                data:defaultDataValue//请求回来的数据
            }
        
        },
        async created (){//该方法用来请求远程数据，并且把加载状态改为加载完成
            this.data = await this.fetchData()//该方法返回的数据给data
            //新建立的获取数据方法，可以在这个方法里调用不同需求的请求数据的方法，具有通用性
            this.isLoaded=false
            // this.data
        }
    } 
}