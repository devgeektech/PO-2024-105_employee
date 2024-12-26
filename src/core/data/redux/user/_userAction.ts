import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserID } from "../../../../services/user.service";
import { setUserDetail } from "./userSlice";

const API_URL = process.env.REACT_APP_API_URL;

const GET_USER = `${API_URL}/users/`;

export const getUser = createAsyncThunk(
  "getUser",
  async (values: any, { rejectWithValue, dispatch}) => {
    try {
      const userId= getUserID();
      const { data } = await axios.get(`${GET_USER}${userId}`);
      dispatch(setUserDetail(data))
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);