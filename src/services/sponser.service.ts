import http from "./http.service";

export const getSponserEvents = async (payload:any) => {
    return http.get(`sponser/getEvents`,{});
}

export const bookEventById= async (eventId:any) => {
    return http.put(`/sponser/updateEvent/${eventId}`,{});
}