import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setNotifications } from "./notificationSlice";

const API_URL = process.env.REACT_APP_API_URL;

const GET_NOTIFICATIONS = `${API_URL}/notifications/`;

export const getNotifications = createAsyncThunk(
  "getNotifications",
  async (values: { page: number; limit: number }, { rejectWithValue, dispatch}) => {
    try {
      const { data } = await axios.get(`${GET_NOTIFICATIONS}`);
      dispatch(setNotifications(data))
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);