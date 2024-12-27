import http from "./http.service";


export const getSubscriptionList = async () => {
    return http.get(`/employee/subscription`,);
}


export const addClass = async (payload: any) => {
    return http.post(`/partner/addClass`, payload);
}

export const editClass = async (id: any, payload: any) => {
    return http.put(`/partner/editClass/${id}`, payload);
}

export const getClassDetails = async (id:any) => {
    return http.get(`/partner/class/${id}`);
}
