import http from "./http.service";


export const getAllMembers= async (payload:any)=>{
    return http.get(`/users/getAllMembers`,{params:payload});
}

export const getFriendRequest= async (payload:any)=>{
    return http.get(`/friends/getAllFriendRequest`,{params:payload});
}

export const getMyFriends= async (payload:any)=>{
    return http.get(`/friends/getAllMyFriends`,{params:payload});
}

export const getAllSendedFriendRequests= async (payload:any)=>{
    return http.get(`/friends/getAllSendedFriendRequest`,{params:payload});
}

export const sendFriend=(payload:any)=>{
    return http.post(`/friends`,payload);
}

export const updateFriend= async (requestId:any, payload:any)=>{
    return http.put(`/friends/${requestId}`,payload);
}