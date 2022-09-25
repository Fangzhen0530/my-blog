import request from './request'
//该文件是留言板

//提交留言信息
export async function postComment(options){
    return await request.post("/api/message",options)
}

//获取已有留言并渲染出来
export async function getComment(page=1,limit=10){
    return await request.get("/api/message",{
        parasm : {
            page,
            limit
        }
    })
}