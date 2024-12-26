import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserID } from "../../../../services/user.service";

const API_URL = process.env.REACT_APP_API_URL;

const GET_USER = `${API_URL}/events/`;

export const getUser = createAsyncThunk(
  "getUser",
  async (values: any, { rejectWithValue, dispatch}) => {
    try {
      const userId= getUserID();
      const { data } = await axios.get(`${GET_USER}${userId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);