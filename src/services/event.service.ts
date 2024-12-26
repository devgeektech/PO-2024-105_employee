import http from "./http.service";

export const getAllEvents= async (payload:any)=>{
    return http.get(`/events/getAllEvents`,{params:payload});
}

export const getAllMyEvents= async (payload:any)=>{
    return http.get(`/events/getAllMyEvents`,{params:payload});
}

export const getAllMyUpcommingEvents= async (payload:any)=>{
    return http.get(`/events/getAllMyUpcommingEvents`,{params:payload});
}

export const getAllMyEventsWithSlots = async(payload:any) => {
    return http.get(`/events/getAllMyEventsWithSlots`,{params:payload});
}

export const getSlots = async(payload: any) => {
    return http.get(`/users/slots/${payload.date}`,{params:payload})
}

export const createSLots = async (payload:any)=>{
    return http.post(`/users/slots`,payload);
}

export const getAllEventInvitations= async (payload:any)=>{
    return http.get(`/events/getAllEventInvitations`,{params:payload});
}

export const getAllEventInvitationsWithSlots = async (payload:any)=>{
    return http.get(`/events/getAllEventInvitationsWithSlots`,{params:payload});
}

export const createEvent= async (payload:any)=>{
    return http.post(`/events`,payload);
}

export const updateEvent= async (eventId:any, payload:any)=>{
    return http.put(`/events/${eventId}`,payload);
}

export const deleteEventById= async (eventId:any)=>{
    return http.delete(`/events/${eventId}`);
}


export const acceptEvent= async (eventId:any, userId: any)=>{
    return http.put(`/events/${eventId}/status`,{status: 'accepted',userId});
}

export const rejectEvent= async (eventId:any, userId: any)=>{
    return http.put(`/events/${eventId}/status`,{status: 'rejected', userId});
}

export const deleteEvent= async (eventId:any, payload:any)=>{
    return http.delete(`/events/${eventId}`,payload);
}