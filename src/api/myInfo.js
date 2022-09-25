import request from './request'

export async function getMyInfo(){
    return await request.get("/api/setting")
}