import http from "./http.service";
import { getStorageItem } from "./storage.service";


export const getWellnesslist = async () => {
    return http.get(`/adminWeb/wellnessTypes`);
}
