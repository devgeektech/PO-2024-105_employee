import http from "./http.service";
import { getStorageItem } from "./storage.service";

export const getUserID = () => {
    return getStorageItem('id');
}

export const getUserToken = () => {
    return getStorageItem('token');
}

export const isLoginUser = () => {
    return getStorageItem('token') ? true : false;
}

export const getUserProfile = async () => {
    const id = getUserID();
    return http.get(`/employee/profile`);
}

export const updateUserById = async (payload: any) => {
    const id = getUserID();
    return http.put(`/users/${id}`, payload);
}

export const updateSponsorById = async (payload: any) => {
    const id = getUserID();
    return http.put(`/users/sponsor/${id}`, payload);
}

export const updateUserAvatarById = async (payload: any) => {
    const id = getUserID();
    return http.put(`/users/${id}`, payload);
}

export const getAssignedUserToTrainer = async () => {
    try {
        const id = getUserID();
        const { data } = await http.get(`/users/trainer/${id}/assignedMembers`);
        return data;
    } catch (error: any) {
        return error;
    }
}

export const subscribeNewsLetter = async (payload: any) => {
    return http.post(`/news-letter`, payload);
}

export const getAssignedTrainer = async () => {
    try {
        const id = getUserID();
        const { data } = await http.get(`/users/trainer/${id}/assigned`);
        return data;
    } catch (error: any) {
        return error;
    }
}