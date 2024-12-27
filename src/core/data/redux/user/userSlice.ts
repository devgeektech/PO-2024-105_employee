import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  userDetail:{},
  location: {},
  isLogin: true
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
    },
    setLocations: (state, action)=>{
      state.location = action.payload
    }
  },
});

export const { setLogin, setUserDetail, setLocations } = userReducer.actions;
