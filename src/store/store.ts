import { configureStore } from "@reduxjs/toolkit";
import lessons from "../reducer/lessonSlice"
import groups from "../reducer/groupSlice"
import users from "../reducer/userSlice"
import userReducer from "../reducer/userSlice";

export const store = configureStore({
  reducer: {
    lessons,
    groups,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;