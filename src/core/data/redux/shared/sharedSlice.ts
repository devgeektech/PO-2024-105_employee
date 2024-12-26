import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  formDetails: {},
  eventModal: false,
  editEventModal: false,
  requestModalStatus: false,
  forumModal: false,
  commentModal: false,
  isProfileReadableOnly: true
};

export const sharedReducer = createSlice({
  name: "shared",
  initialState: initialState,
  reducers: {
    setEventModalStatus: (state, action) => {
      state.eventModal = action.payload;
    },
    setEditEventModalStatus: (state, action) => {
      state.editEventModal = action.payload;
    },
    setRequestModalStatus: (state, action) => {
      state.requestModalStatus = action.payload;
    },
    setForumModalStatus: (state, action) => {
      state.forumModal = action.payload;
    },
    setCommentModalStatus: (state, action) => {
      state.commentModal = action.payload;
    },
    setFormDetail: (state, action) => {
      state.formDetails = action.payload;
    },
    setProfileReadableOnly: (state, action) => {
      state.isProfileReadableOnly = action.payload;
    }
  },
});

export const { setEventModalStatus, setFormDetail, setProfileReadableOnly, setEditEventModalStatus,
  setRequestModalStatus, setForumModalStatus, setCommentModalStatus
} = sharedReducer.actions;
