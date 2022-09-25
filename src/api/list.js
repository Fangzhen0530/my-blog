//这是请求博客文章的数据
import request from './request'
//获取博客分类
export async function getListClassify(){
    return await request.get('/api/blogtype')
}

//获取博客分页数据
export async function getListPage(page = 1, limit = 10, categoryId = -1){
    return await request.get('/api/blog',{
        params : {
            page,
            limit,
            categoryId
        }
    })
}

//获取单个博客，就是跳转进去某一文章里
export async function getOnlyBlog(id){
    return await request.get(`/api/blog/${id}`)
}

//提交评论
export async function postComment(commentInfo){
    return await request.post("/api/comment",commentInfo)
}

//分页获取评论
export async function getPageCom(blogid,page=1,limit=10){
    return await request.get("/api/comment",{
        params :{
            page,
            limit,
            blogid
        }
    })
}