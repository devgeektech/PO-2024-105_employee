import http from "./http.service";

export const getAllNotifications= async (payload:any)=>{
    return http.get(`/notifications/getAllNotifications`,{params:payload});
}