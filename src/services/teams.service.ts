import http from "./http.service";


export const getAllTeams= async (payload:any)=>{
    return http.get(`/teams/getAllMyTeams`,{params:payload});
}

export const getAllTeamMembers= async (payload:any)=>{
    return http.get(`/teams/getAllMyTeamMembers`,{params:payload});
}


export const getAllUserTeams= async (payload:any)=>{
    return http.get(`/teams/getAllUserTeams`,{params:payload});
}

export const createTeam=(payload:any)=>{
    return http.post(`/teams`,payload);
}

export const getTeamById=(teamId:any)=>{
    return http.get(`/teams/detail/${teamId}`);
}

export const updateTeam=(teamId:any,payload:any)=>{
    return http.put(`/teams/${teamId}`,payload);
}

export const deleteTeamById=(teamId:any)=>{
    return http.delete(`/teams/${teamId}`);
}
