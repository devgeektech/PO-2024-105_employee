import http from "./http.service";

export const getAllRooms= async (payload:any)=>{
    return http.get(`/rooms/getAllRooms`,{params:payload});
}
