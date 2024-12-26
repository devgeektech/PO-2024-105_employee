import http from "./http.service";

export const getAllTasks= async (payload:any)=>{
    return http.get(`/tasks/getAllTasks`,{params:payload});
}

export const updateTask = async (requestId:any, payload:any)=>{
    return http.put(`/tasks/${requestId}`,payload);
}