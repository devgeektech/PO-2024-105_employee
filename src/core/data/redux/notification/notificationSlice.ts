import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  notifications:[],
  notificationCount:0
};

export const notificationReducer = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setNotifications:(state, action)=>{
      state.notifications= action.payload;
    },
    setUnReadNotificationCount:(state, action)=>{
      state.notificationCount= state.notificationCount+action.payload;
    },
    setReadNotificationCount:(state, action)=>{
      state.notificationCount= action.payload;
    }
  },
});

export const { setNotifications,setUnReadNotificationCount,setReadNotificationCount } = notificationReducer.actions;
