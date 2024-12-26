import http from "./http.service";


export const getServicelist = async () => {
    return http.get(`/adminWeb/services`);
}
