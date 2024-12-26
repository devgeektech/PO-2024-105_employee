import http from "./http.service";


// forum
export const getAllForums= async (payload:any)=>{
    return http.get(`/forums/getAllForums`,{params:payload});
}

export const getAllMyForums= async (payload:any)=>{
    return http.get(`/forums/getAllMyForums`,{params:payload});
}

export const getForumById= async (forumId:any)=>{
    return http.get(`/forums/${forumId}`);
}

export const addNewForums= async (payload:any)=>{
    return http.post(`/forums`,payload);
}

export const updateForums= async (forumId:any,payload:any)=>{
    return http.put(`/forums/${forumId}`,payload);
}

export const deleteForums= async (forumId:any)=>{
    return http.delete(`/forums/${forumId}`);
}

export const voteForums= async (forumId:any,payload:any)=>{
    return http.patch(`/forums/vote/${forumId}`,payload);
}


// comment

export const addNewComment= async (payload:any)=>{
    return http.post(`/forums/comment`,payload);
} 

export const updateComment= async (commentId:any,payload:any)=>{
    return http.put(`/forums/comment/${commentId}`,payload);
} 

export const voteComment= async (commentId:any,payload:any)=>{
    return http.patch(`/forums/comment/vote/${commentId}`,payload);
}

export const deleteCommentById= async (commentId:any,payload:any)=>{
    return http.delete(`/forums/comment/${commentId}`,payload);
}

// reply

export const addNewReply= async (payload:any)=>{
    return http.post(`/forums/reply`,payload);
} 

export const updateReply= async (replyId:any,payload:any)=>{
    return http.put(`/forums/reply/${replyId}`,payload);
} 

export const voteReply= async (replyId:any,payload:any)=>{
    return http.patch(`/forums/reply/vote/${replyId}`,payload);
}
