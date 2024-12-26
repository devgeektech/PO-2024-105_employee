import http from "./http.service";
import { getStorageItem } from "./storage.service";
const id = getStorageItem("locationId");
export const getLocationById = async () => {
    return http.get(`/partner/location/${id}`);
}

export const getAllLocations = async () => {
    const id = getStorageItem("id");
    return http.get(`/partner/all/locations/${id}`)
}

export const editPartner = async (payload: any) => {
    const partnerId = getStorageItem("id");
    return http.put(`/partner/editProfile/${partnerId}`, payload);
}

export const getClassById = async(payload: any) => {
    const id = payload.id;
    console.log(id,">>>> get Id  index >>>>>")
    return http.get(`/partner/class/${id}`)
}