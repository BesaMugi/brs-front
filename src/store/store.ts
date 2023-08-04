import { configureStore } from "@reduxjs/toolkit";
import application from "../reducer/authSlices";
import lessons from "../reducer/lessonSlice"
import groups from "../reducer/groupSlice"
import users from "../reducer/userSlice"
import userReducer from "../reducer/userSlice";

export const store = configureStore({
  reducer: {
    application,
    lessons,
    groups,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
