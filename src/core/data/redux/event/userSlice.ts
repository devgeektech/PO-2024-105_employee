import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  userDetail:{},
  isLogin: false
};

export const userReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLogin:(state, action)=>{
      state.isLogin= action.payload;
    },
    setUserDetail:(state, action)=>{
      state.userDetail= action.payload;
    }
  },
});

export const { setLogin,setUserDetail } = userReducer.actions;
