import { combineReducers } from "redux";
import { userReducer } from "./user/userSlice";
import { sharedReducer } from "./shared/sharedSlice";
import { notificationReducer } from "./notification/notificationSlice";

const rootReducer = combineReducers({
  user: userReducer.reducer,
  shared: sharedReducer.reducer,
  notification: notificationReducer.reducer,
});

export default rootReducer;
